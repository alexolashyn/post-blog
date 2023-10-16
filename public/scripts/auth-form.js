$(document).ready(function () {
  $('#login').show();
  $('#createAccount').hide();

  $('#linkCreateAccount').click(function (e) {
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

  $('#login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/auth/login',
      data: $(this).serialize(),
      success: function (response) {
        window.location.replace('/v1/test');
      },
      error: function (error) {
        const errorMessage = JSON.parse(error.responseText).message;
        $('.form__input-error-message').text(errorMessage);
        localStorage.removeItem('token');
      }
    });
  });

  $('#createAccount').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/auth/sign-up',
      data: $(this).serialize(),
      success: function (response) {
        $.ajax({
          type: 'GET',
          url: '/api/blog/view-posts', 
          headers: {
            'Authorization': 'Bearer ' + response.token,
            'Content-Type': 'application/json'
          },
          success: function (data) {
            $('html').html(data);
          },
          error: function (error) {
            console.error(error);
          }
        });
      },
      error: function (error) {
        const errorMessage = JSON.parse(error.responseText).message;
        $('.form__input-error-message').text(Object.values(errorMessage).join(', '));
        localStorage.removeItem('token');
      }
    });
  });
});