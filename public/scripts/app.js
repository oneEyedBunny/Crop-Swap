"use strict"

//DONE: validate the username/password inputs, recieves token from server if so
$('#login-user').submit(event => {
  event.preventDefault();
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
       localStorage.setItem("authToken", JSON.stringify(res.authToken));
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

//DONE: creates the new user form
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
      type: "submit",
      value: "Create Profile",
      id: "create-profile-button"
    }).appendTo('#new-user-fieldset');
}

///// NEED TO REMAKE THIS TO MODEL AJAX CALL ABOVE. DATA ISN'T REGISTERING WITH THIS FORMAT
//submits a post request for users, clears form & displays success message
$('#create-profile-button').submit(event => {
    event.preventDefault();
    console.log("hi");
    let userData = {
      firstNname: event.target.form.firstName.value,
      lastName: event.target.form.lastName.value,
      email: event.target.form.email.value,
      city: event.target.form.city.value,
      zipCode: event.target.form.zipCode.value,
      userName: event.target.form.userName.value,
      password: event.target.form.password.value,
    };
    console.log(userData);
    $.post('/user', userData)
    .then(function(userData, res) {
      $('#new-user-form').hide();
      $('<p>').appendTo('#profile-forms-container').addClass('create-account-success-message').html(`Thanks for signing up ${userData.username}! Now you can create a swap `);
      localStorage.setItem("authToken", JSON.stringify(res.authToken));
    })
  });
