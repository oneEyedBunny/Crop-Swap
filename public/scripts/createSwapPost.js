"use strict"

//submits GET request for all swaps by user
function loadUserSwaps() {
  //where is user id stored to grab it? Local storage??
  //how do I set the req.params.id with it?
  $.get('/posts/user/:id')
  .then(res => {
    renderSwapPosts(res);
  });
};

//renderUserSwaps() render get results of server response
// function renderUserPostList(data) {
//   console.log("data", data);
//   let post = data.swapPosts.map(swapPost => {
//     return  `
//      <div class="search-results-card">
//      <h5 class="userName">${swapPost.userName}</h5>
//      <h6 class="created">${swapPost.created}</h6>
//      <h5 class="have">I have: ${swapPost.have}<h5>
//      <h5 class="want">Swap for: ${swapPost.want}<h5>
//      </div>
//      `
//    })
//   $('#search-results-container').html(post);
//  };

//loadUserSwaps() loading of page > submits get request for all swaps by user
//& passses response to renderUserSwaps

//submitSwap()  submit button > submits post request to server, clears form,
//and recalls loadUserSwaps()

//renderEditSwap() takes response from server and renders it to a pop up box
//fields are editable and there is a submit button

//editSwap() edit button > get request by id > calls renderEditSwap()

//editSwapButton() submits a put request to the server with the changes
//closes the pop up box, and calls loadUserSwaps() so the updated data is shown

//deleteSwap() delete button submits a delete request to the server, and
//removes the swap card from the page

//Document ready functions for jQuery
$(function() {
  loadSwaps();
});
