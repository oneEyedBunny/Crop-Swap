"use strict"

//get request for all posts, happens when page loads
function loadSwaps() {
  $.get('/posts')
  .then(res => {
    renderSwapPosts(res);
  });
};

//renders the swaps onto the page
 function renderSwapPosts(data) {
   console.log("data", data);
   let post = data.swapPosts.map(swapPost => {
     return  `
      <div class="search-results-card">
      <h5 class="userName">${swapPost.userName}</h5>
      <h6 class="created">${swapPost.created}</h6>
      <h5 class="have">I have: ${swapPost.have}<h5>
      <h5 class="want">Swap for: ${swapPost.want}<h5>
      </div>
      `
    })
   $('#search-results-container').html(post);
  };

//submit button > get request to server for specified search params
$('.search-button').click(function(event) {
  event.preventDefault();
    let requestData = {
      type: event.target.form.search.value,
      item: event.target.form.searchdata.value,
      loc: event.target.form.searchloc.value,
    };
  console.log("search=", requestData);
  $.get('/posts', requestData)
 .then(res => {
  renderSwapPosts(res);
 });
});

//clicking on userName > provides email address in popup??
// $(document).on("mouseenter", "li", function() {
//     // hover starts code here
// });
//
// $(document).on("mouseleave", ".userName", function() {
//     // hover ends code here
// });


//Document ready functions for jQuery
$(function() {
  loadSwaps();
  renderSwapPosts();
});








//------------------------------------------------
// function testing() {
// $.get('/posts')
// .then(function(swapPosts) {
//   console.log(swapPosts);
//   swapPosts.forEach(function (post) {
//     var $option = $('<option>').attr('value', post.have).text(post.want);
//       $('#search-results-container').append($option)
//     })
// });
// }


// function renderSwapPosts(swapPosts) {
//   console.log(swapPosts);
//   let results;
//   swapPosts.forEach(function (swapPost) {
//    swapPost.map(swapPost => {
//      return results = `
//       <div class="search-results-card">
//       <h5>${swapPost.userName}</h5>
//       <h6>${swapPost.created}</h6>
//       <h5>${swapPost.have}<h5>
//       </div>
//       `
//     })
//     $('#search-results-container').append("Hello");
//   })
// })
