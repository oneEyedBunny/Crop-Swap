"use strict"

let id = localStorage.getItem('userId');
let authToken = localStorage.getItem('authToken');

//checks to see if user info is in local storage to customize what displays on page
function isUserLoggedIn() {
  let authToken = localStorage.getItem('authToken');
  let username = localStorage.getItem('username');
  if(authToken) {
    $('.not-logged-in').addClass('hidden');
    $('.logged-in').removeClass('hidden');
    $('#login-user').addClass('hidden');
  } else {
    $('.logged-in').addClass('hidden');
    $('.not-logged-in').removeClass('hidden')
  }
}

//function that clears user data from local storage, and directs them to the appropriate page
function logOutUser() {
  localStorage.clear();
  $('.logged-in').addClass('hidden');
  $('.not-logged-in').removeClass('hidden')
}

//submits GET request for all swaps by user using path variables
function loadUserSwaps() {
  $('#no-posts-message').remove();
  $.get('/posts/user/' + id)
  .then(res => {
    if(!res.swapPosts.length) {
      $('<p>').fadeIn().appendTo('#active-swap-list').html('Your dont have any posts yet').attr('id', 'no-posts-message');
    } else {
      renderUserSwapList(res);
    }
  });
};

//renders all user swap posts to the page
function renderUserSwapList(data) {
  let post = data.swapPosts.map(swapPost => {
    return  `
    <div class="individual-list-card" id="${swapPost.id}">
    <li class="active-swap-listing">${swapPost.have}</li>
    <button role ="button" type="submit" class="edit-button" value=${swapPost.id}>Edit</button>
    <button role ="button" type="submit" class="delete-button" value=${swapPost.id}>Delete</button>
    </div>
    `
  })
  $('#active-swap-list').html(post);
};

//submits a delete request and removes the swap card from the page
$('#active-swap-list').on('click', '.delete-button', event => {
  event.preventDefault();
  let requestId = $(event.target).attr('value');
  let requestData = {
    id: requestId,
    user: id,
    authToken: authToken
  };

  $.ajax({
    type: 'DELETE',
    url: '/posts/' + requestId,
    data: JSON.stringify(requestData),
    success: function() {
      $('#create-post-sucess-message, #create-post-error-message').remove();
      $('#' + requestId).remove();
    },
    error: function(err) {
    },
    dataType: 'json',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + authToken }
  });
});

//get request by id for post that was clicked
$('#active-swap-list').on('click', '.edit-button', event => {
  event.preventDefault();
  let requestId = $(event.target).attr('value');
  let requestData = {
    id: requestId,
  };
  $.get('/posts/' + requestId)
  .then(res => {
    renderEditSwap(res);
    $('.popup, .popup-content').addClass('active');
    $('#create-post-sucess-message, #create-post-error-message').remove();

  });
});

// takes response from server and renders it to a pop up box
function renderEditSwap(res) {
  let popup =`
  <div class="popup-overlay">
  <div class="popup-content">
  <form role="form" id="edit-post-form">
  <fieldset>
  <legend>Edit My Swap Post</legend>
  <label for="description">Description of what you have:</label>
  <textarea id="edit-swap-posting-have" name="swapPostingHave" rows="5" maxlength="100" wrap="hard">${res.swapPost.have}</textarea>
  <label>What would you like to swap for (not required):
  <textarea id="edit-swap-posting-want" name="swapPostingWant" rows="5" maxlength="100">${res.swapPost.want}</textarea>
  </label>
  <button role="button" type="submit" id="edit-swap-button" value=${res.swapPost.id}>Submit</button>
  </fieldset>
  </form>
  </div>
  </div>
  `
  $('#active-swap-list').html(popup);
}

//submits a put request with the swap post changes, closes popup box, and reflects updated data in active list
$('#active-swap-list').on('click', '#edit-swap-button', event => {
  event.preventDefault();
  let changeData = {
    id: $('#edit-swap-button').val(),
    have: $('#edit-swap-posting-have').val(),
    want: $('#edit-swap-posting-want').val(),
    user:  id,
    authToken: authToken
  };

  $.ajax({
    type: 'PUT',
    url: '/posts/' + changeData.id,
    data: JSON.stringify(changeData),
    success: function() {
      $('.popup, .popup-content').removeClass('active');
      loadUserSwaps()
    },
    error: function(err) {
    },
    dataType: 'json',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + authToken }
  });
});

//submits post request, clears form and reloads the page w/new swap in Active section
$('.create-post-button').click(function(event) {
  event.preventDefault();
  let requestData = {
    have: $('#swap-posting-have').val(),
    want: $('#swap-posting-want').val(),
    user:  id,
    authToken: authToken,
  }
  $.ajax({
    type: 'POST',
    url: '/posts',
    data: JSON.stringify(requestData),
    success: function() {
      $('#create-post-form')[0].reset();
      $('#create-post-sucess-message, #create-post-error-message').remove();
      $('<p>').fadeIn().appendTo('#create-post-form').html('Your post was created successfully, see below').attr('id', 'create-post-sucess-message');
      loadUserSwaps();
    },
    error: function() {
      $('#create-post-sucess-message, #create-post-error-message').remove();
      $('<p>').appendTo('#create-post-form').html('We had some trouble with your post, please try again').attr('id', 'create-post-error-message');
    },
    dataType: 'json',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + authToken }
  });
});

//Document ready functions for jQuery
$(function() {
  isUserLoggedIn();
  loadUserSwaps();
});
