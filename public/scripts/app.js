"use strict"

//DONE: validate the username/password inputs, recieves token from server if so
$('#login-user').submit(event => {
  event.preventDefault();
  let userData = {
    username: $('.username').val(),
    password: $('.password').val()
  }
  console.log("userData=", userData);
   $.ajax({
     type: "POST",
     url: '/auth/login',
     data: JSON.stringify(userData),
     success: function(res) {
       console.log(res);
       localStorage.setItem("authToken", JSON.stringify(res.authToken));
       localStorage.setItem("userId", JSON.stringify(res.userId));
       localStorage.setItem("username", JSON.stringify(res.username));
       $('#login-user').hide();
       $('<p>').appendTo('#profile-forms-container').addClass('login-success-message').html(`Welcome back ${userData.username}! `);
     },
      error: function() {
        $('#login-user').hide();
        $('<p>').appendTo('#profile-forms-container').addClass('login-error-message').html("We could not find an account. Please create one here -----> ");
        renderCreateAccountForm();
       },
     dataType: 'json',
     contentType: "application/json"
  });
});

//DONE: removes existing form and calls function that renders new form
$('#new-user').click(event => {
  event.preventDefault()
  $('#login-user').hide();
  renderCreateAccountForm();
});

//NEED TO REFACTOR THIS CODE < STARTED DOWN BELOW
//creates the new user form
function renderCreateAccountForm() {
  $('<form>').fadeIn().appendTo('#profile-forms-container').attr('id', 'new-user-form');
  $('<fieldset>').appendTo('#new-user-form').attr('id', 'new-user-fieldset');
  $('<legend>').appendTo('#new-user-fieldset').html("Profile Info");
  $('<div>').appendTo('#new-user-fieldset').addClass('new-user-div');

  $('<label>').appendTo('.new-user-div').html("First Name: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "firstName").attr("id", "firstName").attr('required');
  $('<label>').appendTo('.new-user-div').html("Last Name: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "lastName").attr("id", "lastName").attr('required');
  $('<label>').appendTo('.new-user-div').html("Email: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "email").attr("id", "email").attr('required');
  $('<label>').appendTo('.new-user-div').html("City: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "city").attr("id", "city").attr('required');
  $('<label>').appendTo('.new-user-div').html("Zip Code: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "zipCode").attr("id", "zipCode").attr('required');
  $('<label>').appendTo('.new-user-div').html("User Name: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "username").attr("id", "username").attr('required');
  $('<label>').appendTo('.new-user-div').html("Password: ");
  $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "password").attr("id", "password").attr("type","password").attr('required');

  $('<input>').attr({
      type: "submit",
      value: "Create Profile",
      id: "create-profile-button",
    }).appendTo('#new-user-fieldset');
}

//DONE: submits a post request for users, clears form & displays success message
$('#profile-forms-container').on('submit','#new-user-form', (event => {
    event.preventDefault();
    let userData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        city: $('#city').val(),
        zipCode: $('#zipCode').val(),
        username: $('#username').val(), //if I add JWT into user, then this needs to change to lowercase username, and change all code in userRouter.js
        password: $('#password').val(),
    };
    console.log("userData=", userData);
     $.ajax({
       type: "POST",
       url: '/users',
       data: JSON.stringify(userData),
       success: function(res) {
         console.log(res);
         localStorage.setItem("authToken", JSON.stringify(res.authToken)); //need JWT in usersRouter for this
         localStorage.setItem("userId", JSON.stringify(res.userId));
         localStorage.setItem("username", JSON.stringify(res.username));
         $('#new-user-form').hide();
         $('<p>').appendTo('#profile-forms-container').addClass('create-account-success-message').html(`Welcome to the swap community ${userData.firstName}! Now you can create a swap `);
         //need to add> switch header from login to logout
       },
        error: function() {
          $('#login-user').hide();
          $('<p>').appendTo('#profile-forms-container').addClass('login-error-message').html("woops ");
         },
       dataType: 'json',
       contentType: "application/json"
    });
  }));

// function renderCreateAccountForm() {
//   $('<form>').fadeIn().appendTo('#profile-forms-container').attr('id', 'new-user-form');
//   $('<fieldset>').appendTo('#new-user-form').attr('id', 'new-user-fieldset');
//   $('<legend>').appendTo('#new-user-fieldset').html("Profile Info");
//   $('<div>').appendTo('#new-user-fieldset').addClass('new-user-div');
//
//   let labels = ["First Name", "Last Name", "Email", "City", "Zip Code", "User Name"];
//   let name = ["firstName", "lastName", "email", "city", "zipCode", "username"];
// for(let i =0 ; i < labels.length; i++) {
//   $('<label>').appendTo('.new-user-div').html(labels[0]);
//   $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", name[0]).attr('required');
// }
//   $('<label>').appendTo('.new-user-div').html("Password: ");
//   $('<input>').appendTo('.new-user-div').addClass('new-form-fields').attr("name", "password").attr("type","password").attr('required');
//
//   $('<input>').attr({
//     type: "submit",
//     value: "Create Profile",
//     id: "create-profile-button",
//   }).appendTo('#new-user-fieldset');
// }

//text(`${labels[0]: }');
