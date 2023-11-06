$(document).ready(function () {
    $('#login').show();
    $('#createAccount').hide();
  
    $('#linkSignUp').click(function (e) {
      e.preventDefault();
      $('.form__input-error-message').text('');
      $('#login').hide();
      $('#createAccount').show();
    });
  
    $('#linkLogin').click(function (e) {
      e.preventDefault();
      $('.form__input-error-message').text('');
      $('#createAccount').hide();
      $('#login').show();
    });

});