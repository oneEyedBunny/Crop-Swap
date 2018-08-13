"use strict"

//checks to see if user info is in local storage to customize what displays on page
function isUserLoggedIn() {
  let authToken = localStorage.getItem('authToken');
  let username = localStorage.getItem('username');
  if(authToken) {
    $('.not-logged-in').addClass('hidden');
    $('.logged-in').removeClass('hidden');
    $('#login-user').addClass('hidden');
    $('<p>').appendTo('#profile-forms-container').html(`Welcome back ${username}! `);
  }
}

//function that clears user data from local storage, and directs them to the appropriate page
function logOutUser() {
  localStorage.clear();
  $('.logged-in').addClass('hidden');
  $('.not-logged-in').removeClass('hidden');
}

//validate the username/password inputs, recieves token from server if so
$('#login-user').submit(event => {
  event.preventDefault();
  let userData = {
    username: $('.username').val(),
    password: $('.password').val()
  }
  $.ajax({
    type: 'POST',
    url: '/auth/login',
    data: JSON.stringify(userData),
    success: function(res) {
      localStorage.setItem('authToken', res.authToken);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('username', res.username);
      $('#login-user').hide();
      isUserLoggedIn();
    },
    error: function() {
      $('#login-user')[0].reset();
      $('<p>').appendTo('.error-message-container').addClass('login-error-message').html('Your username or password was incorrect, please try again');
    },
    dataType: 'json',
    contentType: 'application/json'
  });
});

//removes existing form and calls function that renders new form
$('#new-user').click(event => {
  event.preventDefault()
  $('#login-user').hide();
  renderCreateAccountForm();
});

//creates the new user form
function renderCreateAccountForm() {
  let form = `
    <form id ="new-user-form">
      <fieldset id = "new-user-fieldset">
        <legend>Profile Info</legend>
          <div class="error-message-container"></div>
          <div class = "new-user-div">
            <label>First Name: </label>
            <input class ="new-form-fields" id = "firstName" name = "firstName" required>
            <label>Last Name: </label>
            <input class ="new-form-fields" id = "lastName" name = "lastName" required>
            <label>Email: </label>
            <input class ="new-form-fields" id = "email" type= "email" name = "email" required>
            <label>City: </label>
            <input class ="new-form-fields" id = "city" name = "city" required>
            <label>Zip Code: </label>
            <input class ="new-form-fields" id = "zipCode" name = "zipCode" required>
            <label>Username: </label>
            <input class ="new-form-fields" id = "username" name = "username" required>
            <label>Password: </label>
            <input class ="new-form-fields" id = "password" name = "password" type= "password" required>
            <button role="button" type = "submit" id = "create-profile-button">Create Profile</button>
        </div>
      </fieldset>
    </form>
    `
  $("#profile-forms-container").html(form);
}

//submits a post request for users, clears form & displays success message
$('#profile-forms-container').on('submit','#new-user-form', (event => {
  event.preventDefault();
  let userData = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    email: $('#email').val(),
    city: $('#city').val(),
    zipCode: $('#zipCode').val(),
    username: $('#username').val(),
    password: $('#password').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/users',
    data: JSON.stringify(userData),
    success: function(res) {
      localStorage.setItem('authToken', res.authToken);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('username', res.username);
      $('.login-error-message').remove();
      $('.not-logged-in').addClass('hidden');
      $('.logged-in').removeClass('hidden');
      $('#new-user-form').hide();
      $('<p>').appendTo('#profile-forms-container').addClass('create-account-success-message').html(`Welcome to the swap community ${userData.firstName}!`);

    },
    error: function() {
      $('#login-user').hide();
      $('.login-error-message').remove();

      $('.error-message-container').addClass('login-error-message').html('<p>There was an error processing your info, please try again</p>');
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}));

//document ready function for jQuery
$(function() {
  isUserLoggedIn();
});
