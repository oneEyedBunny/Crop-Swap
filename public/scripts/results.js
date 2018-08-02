"use strict"

//loading of page, submits get request for all posts
function loadSwaps() {
  $.get('/posts')
  .then(function(res) {
    renderSwapPosts(res);
  });
};

//renders the swaps on the page
 function renderSwapPosts(data) {
   console.log("data", data);
   let post = data.swapPosts.map(swapPost => {
     return  `
      <div class="search-results-card">
      <h5>${swapPost.userName}</h5>
      <h6>${swapPost.created}</h6>
      <h5>${swapPost.have}<h5>
      </div>
      `
    })
   $('#search-results-container').html(post);
  };


//searchSwaps()  submits get request to server for specific item
//onclick of .seach-button, submits a get request to get('/') with
//3 query params (have/want, city, & search item)
//passses response object to renderSwapPosts()


//clicking on userName > provides email address in popup??


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
