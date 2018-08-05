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
     <div class="individual-list-card">
     <li class="active-swap-listing">${swapPost.have}</li>
     <button role ="button" type="submit" class="edit-button" value=${swapPost.id}>Edit</button>
     <button role ="button" type="submit" class="delete-button" value=${swapPost.id}>Delete</button>
     </div>
     `
   })
  $('#active-swap-list').html(post);
 };

 //submits a delete request and removes the swap card from the page
//  $('.delete-button').click(function(event) {
//    event.preventDefault();
//      let requestData = {
//        //id: event.target.form.swapPostingHave.value,
//      };
//    console.log("deleted id=", requestData.id);
//    $.delete('/posts/:id', requestData)
//   .then(requestData => {
//    //Removes the card from the page
//   });
//  });
//
//  //get request by id for post that was clicked
//  $('.edit-button').click(function(event) {
//    event.preventDefault();
//    // let swapId = event.target??
//    $.get('/posts/:id', swapId)
//    .then(res => {
//      renderSwapPosts(res);
//    })
//    renderEditSwap(res)
//  })
//
//  //takes response from server and renders it to a pop up box
//  //fields are editable and there is a submit button (#edit-swap-button)
//  function renderEditSwap(swap) {
//
//  }
//
//  //submits a put request with the changes
//  //closes the pop up box, and calls loadUserSwaps() so the updated data is shown
//  $('.edit-post-button').click(function(event) {
//    event.preventDefault();
//    let changeData = {
//      //these form.swap... items need to be adjusted for what you set pop up box to be
//      // have: event.target.form.swapPostingHave.value,
//      // want: event.target.form.swapPostingWant.value,
//      id: // local storage??
//      //JWT info???
//    };
//    //console.log("submitted data=", requestData);
//    $.put('/posts/:id', changeData)
//   .then(changeData => {
//    loadUserSwaps(changeData.id)
//   });
// });
//
//submits post request, clears form and reloads the page w/swap in Active section
$('.create-post-button').click(function(event) {
  event.preventDefault();
    let requestData = {
      have: $('#swapPosting-have').val(),
      want: $('#swapPosting-want').val(),
      user: id,
      authToken: authToken
    }
  console.log("requested data=", requestData);
  $.ajax({
    type: 'POST',
    url: '/posts',
    data: JSON.stringify(requestData),
    success: function() {
      $('<p>').fadeIn().appendTo('#create-post-form').html('Your post was created, see below').attr('id', 'post-created-message');
    },
     error: function() {
       $('<p>').appendTo('#create-post-form').addClass('create-post-error-message').html("Something went really wrong");
      },
    dataType: 'json',
    contentType: "application/json"
  });
});

//Document ready functions for jQuery
$(function() {
  loadUserSwaps();
});
