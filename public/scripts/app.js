"use strict"

//validate the username/password inputs to see if the user has an account
$('#login-user').submit(function(e) {
  e.preventDefault();
  let userData = {
    username: $('.username').val(),
    password: $('.password').val()
  }
  console.log("userData=", userData)
   $.ajax({
     type: "POST",
     url: '/auth/login',
     data: JSON.stringify(userData),
     success: function(res) {
       console.log(res);
     },
     dataType: 'json',
     contentType: "application/json"
  });
 //  // if(!userMatch) {
 //  //   $('<p>').appendTo('#profile-forms-container').addClass('error-message').html("We could not find an account. Please create one here -----> ");
 //  //   createAccountForm ();
 //  // } else {
 //  //   localStorage.setItem("currentUserKey", JSON.stringify(userMatch));
 //  //   window.location = "results.html";
 //  // }
 // })

});

//removes existing form and calls function that renders new form
$('#new-user').click (function() {
  $('#login-user').hide();
  renderCreateAccountForm();
});

//creates the new user form
function renderCreateAccountForm() {
  $('<form>').fadeIn().appendTo('#profile-forms-container').attr('id', 'new-user-form');
  $('<fieldset>').appendTo('#new-user-form').attr('id', 'new-user-fieldset');
  $('<legend>').appendTo('#new-user-fieldset').html("Profile Info");
  $('<div>').appendTo('#new-user-fieldset').addClass('new-user-div');

  $('<label>').appendTo('.new-user-div').html("First Name: ");
  $('<input>').appendTo('.new-user-div').attr("name", "firstName");
  $('<label>').appendTo('.new-user-div').html("Last Name: ");
  $('<input>').appendTo('.new-user-div').attr("name", "lastName");
  $('<label>').appendTo('.new-user-div').html("Email: ");
  $('<input>').appendTo('.new-user-div').attr("name", "email");
  $('<label>').appendTo('.new-user-div').html("City: ");
  $('<input>').appendTo('.new-user-div').attr("name", "city");
  $('<label>').appendTo('.new-user-div').html("Zip Code: ");
  $('<input>').appendTo('.new-user-div').attr("name", "zipCode");
  $('<label>').appendTo('.new-user-div').html("User Name: ");
  $('<input>').appendTo('.new-user-div').attr("name", "userName");
  $('<label>').appendTo('.new-user-div').html("Password: ");
  $('<input>').appendTo('.new-user-div').attr("name", "password").attr("type","password");

  let $newUserButton=$('<input>').attr({
      type: "button",
      value: "Create Profile",
      id: "create-profile-button"
    }).appendTo('#new-user-fieldset');
}

//submits a post request for users, clears form & displays success message
$('#new-user-submit-button').click (function(event) {
    event.preventDefault();
    let userData = {
      firstNname: event.target.form.firstName.value,
      lastName: event.target.form.lastName.value,
      email: event.target.form.email.value,
      city: event.target.form.city.value,
      zipCode: event.target.form.zipCode.value,
      userName: event.target.form.userName.value,
      password: event.target.form.password.value,
    };

    $.post('/user', userData)
    .then(function(userData) {
      //clears forms & displays success message
      localStorage.setItem("currentUserKey", JSON.stringify(userData.userName));
      window.location = "profile.html";
    })
  });
