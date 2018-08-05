"use strict"

//submits GET request for all swaps by user
function loadUserSwaps(userId) {
  //where is user id stored to grab it? Local storage??
  //how do I set the req.params.id with it?
  $.get('/posts/user/:id')
  .then(res => {
    renderSwapPosts(res);
  });
};

//renders all user swap posts  !!!!!!!!!!!!!How do I set value of buttons to ID of swap post
function renderUserPostList(data) {
  console.log("data", data);
  let post = data.swapPosts.map(swapPost => {
    return  `
     <div class="individual-list-card">
     <li class="active-swap-listing">${swapPost.have}</li>
     <button role ="button" type="submit" class="edit-button">Edit</button>
     <button role ="button" type="submit" class="delete-button">Delete</button>
     <h5 class="username">${swapPost.username}</h5>
     </div>
     `
   })
  $('#search-results-container').html(post);
 };

 //submits a delete request and removes the swap card from the page
 $('.delete-button').click(function(event) {
   event.preventDefault();
     let requestData = {
       //id: event.target.form.swapPostingHave.value,
     };
   console.log("deleted id=", requestData.id);
   $.delete('/posts/:id', requestData)
  .then(requestData => {
   //Removes the card from the page
  });
 });

 //get request by id for post that was clicked
 $('.edit-button').click(function(event) {
   event.preventDefault();
   // let swapId = event.target??
   $.get('/posts/:id', swapId)
   .then(res => {
     renderSwapPosts(res);
   })
   renderEditSwap(res)
 })

 //takes response from server and renders it to a pop up box
 //fields are editable and there is a submit button (#edit-swap-button)
 function renderEditSwap(swap) {

 }

 //submits a put request with the changes
 //closes the pop up box, and calls loadUserSwaps() so the updated data is shown
 $('.edit-post-button').click(function(event) {
   event.preventDefault();
   let changeData = {
     //these form.swap... items need to be adjusted for what you set pop up box to be
     // have: event.target.form.swapPostingHave.value,
     // want: event.target.form.swapPostingWant.value,
     id: // local storage??
     //JWT info???
   };
   //console.log("submitted data=", requestData);
   $.put('/posts/:id', changeData)
  .then(changeData => {
   loadUserSwaps(changeData.id)
  });
});

//submits post request, clears form and reloads the page w/swap in Active section
$('.create-post-button').click(function(event) {
  event.preventDefault();
    let requestData = {
      have: event.target.form.swapPostingHave.value,
      want: event.target.form.swapPostingWant.value,
      id: // local storage??
      //JWT info???
    };
  //console.log("submitted data=", requestData);
  $.post('/posts', requestData)
 .then(requestData => {
  //clear the form & display a message saying it's complete
  loadUserSwaps(requestData.id)
 });
});

//Document ready functions for jQuery
$(function() {
  loadUserSwaps();
});
