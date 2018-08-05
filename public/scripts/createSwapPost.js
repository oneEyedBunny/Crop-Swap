"use strict"

let id = JSON.parse(localStorage.getItem("userId"));
let authToken = JSON.parse(localStorage.getItem("authToken"));

//submits GET request for all swaps by user using path variables
function loadUserSwaps() {
  // $.ajax({
  //   type: 'GET',
  //   url: '/posts/user/' + id,
  //   data: JSON.stringify(id),
  //   success: renderUserSwapList,
  //   error: function(err) {
  //      console.error(err)
  //     },
  //   dataType: 'json',
  //   contentType: "application/json"
  // });

  $.get('/posts/user/' + id)
  .then(res => {
    renderUserSwapList(res);
  });
};

//renders all user swap posts
function renderUserSwapList(data) {
  console.log("data", data);
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
 $('#active-swap-list').on("click", '.delete-button', event => {
   event.preventDefault();
   let requestId = $(event.target).attr("value");
   let requestData = {
     id: requestId,
     user: id,
     authToken: authToken
   };
    console.log("delete id=", requestId);

    $.ajax({
      type: 'DELETE',
      url: '/posts/' + requestId,
      data: JSON.stringify(requestData),
      success: function() {
        console.log("delete worked!");
        $('#requestId').remove();
       },
      error: function(err) {
         console.log(err);
        },
      dataType: 'json',
      contentType: "application/json",
      headers: { "Authorization": 'Bearer ' + authToken }
    });
 });

 //get request by id for post that was clicked
 // $('#active-swap-list').on("click", ".edit-button", event => {
 //   event.preventDefault();
 //   let requestId = $('.edit-button').val();
 //   console.log("edit id=", requestId);
 //
 //   $.get('/posts/' + requestId)
 //   .then(res => {
 //     renderEditSwap(res);
 //   });
 // });

// takes response from server and renders it to a pop up box
//  function renderEditSwap(res) {
  // <div class="popup-overlay">
  //  <div class="popup-content">
      // <form role="form" id="create-post-form">
      //   <fieldset>
      //     <legend>Edit My Swap Post</legend>
      //     <label for="description">Description of what you have:</label>
      //     <textarea id="swapPosting-have" name="swapPostingHave" value=${res.swapPost.have} maxlength="100" wrap="hard"></textarea>
      //     <label>What would you like to swap for (not required):
      //     <textarea id="swapPosting-want" name="swapPostingWant" value=${res.swapPost.have} maxlength="100"></textarea>
      //     </label>
      //     <button role="button" type="submit" class="edit-swap-button">Submit</button>
      //   </fieldset>
      // </form>
  // </div>
  // </div>
//  }

//  //submits a put request with the changes
//  //closes the pop up box, and calls loadUserSwaps() so the updated data is shown
//  $('???').on("submit", ".edit-swap-button", event => {
//    event.preventDefault();
//    let changeData = {
//      //these form.swap... items need to be adjusted for what you set pop up box to be
//      // have: event.target.form.swapPostingHave.value,
//      // want: event.target.form.swapPostingWant.value,
//      id: // local storage??
//    };
//    //console.log("submitted data=", requestData);
//    $.put('/posts/:id', changeData)
//   .then(changeData => {
//    loadUserSwaps(changeData.id)
//   });
// });

//submits post request, clears form and reloads the page w/swap in Active section
$('.create-post-button').click(function(event) {
  event.preventDefault();
    let requestData = {
      have: $('#swapPosting-have').val(),
      want: $('#swapPosting-want').val(),
      user:  id,
      authToken: authToken
    }
  console.log("requested data=", requestData);
  $.ajax({
    type: 'POST',
    url: '/posts',
    data: JSON.stringify(requestData),
    success: function() {
      $("#create-post-form")[0].reset();
      $('<p>').fadeIn().appendTo('#create-post-form').html('Your post was created successfully, see below').attr('id', 'create-post-sucess-message');
    },
     error: function() {
       $('<p>').appendTo('#create-post-form').html("We had some trouble with your post, please try again").attr('id', 'create-post-error-message');
      },
    dataType: 'json',
    contentType: "application/json",
    headers: { "Authorization": 'Bearer ' + authToken }
  });
});

//Document ready functions for jQuery
$(function() {
  loadUserSwaps();
});
