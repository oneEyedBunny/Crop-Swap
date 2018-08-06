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
   let post = data.swapPosts.map(swapPost => {
     return  `
      <div class="search-results-card">
      <h5 class="username">${swapPost.username}</h5>
      <h5 class="email">${swapPost.email}</h5>
      <h6 class="created">${swapPost.created}</h6>
      <h5 class="have">I have: ${swapPost.have}<h5>
      <h5 class="want">Swap for: ${swapPost.want}<h5>
      </div>
      `
    })
   $('#search-results-container').html(post);
};

//submit button > AJAX get request to server for specified search params
$('.search-button').click(function(event) {
  event.preventDefault();
    let requestData = {
      type: event.target.form.search.value,
      item: event.target.form.searchdata.value,
      loc: event.target.form.searchloc.value,
    };
  $.get('/posts', requestData)
 .then(res => {
   if(!res.swapPosts.length) {
    $('#search-results-container').html("");
    const noDataMessage = "There are no swaps meeting your search criteria";
     $('<p>').fadeIn().appendTo('#search-results-container').html(noDataMessage).attr('id', 'no-data-error');
  } else {
    renderSwapPosts(res);
    $("#search-form")[0].reset();
  }
 });
});

//Document ready functions for jQuery
$(function() {
  loadSwaps();
});








//------------------------------------------------

//clicking on username > provides email address in popup??
// $(document).on("mouseenter", "li", function() {
//     // hover starts code here
// });
//
// $(document).on("mouseleave", ".username", function() {
//     // hover ends code here
// });



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
//       <h5>${swapPost.username}</h5>
//       <h6>${swapPost.created}</h6>
//       <h5>${swapPost.have}<h5>
//       </div>
//       `
//     })
//     $('#search-results-container').append("Hello");
//   })
// })
