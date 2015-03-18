'use strict';

var Registration = (function(){
  var authToken, apiHost;

  var run = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'http://localhost:3000/';
    setupAjaxRequests();

    $('#registrationForm').on('submit', submitRegistration);
    $('#loginForm').on('submit', submitLogin);
    $('#signOut').on('click', signOut);
  };

  var submitRegistration = function(e){
    if(e.preventDeafault){
      e.preventDefault();
    }
    $.ajax({
      url:apiHost + '/users',
      type: 'POST',
      data: {
        user:
        {
          username: $('#username').val(),
          email: $('#email').val(),
          password: $('#password').val()
        }
      },
      complete: function(response){
        console.log('completing the submitRegistration ajax request',response);
      }
    }).done(loginSuccess).fail(function(err){
      console.log(err);
    });
    return false;
  };

  var submitLogin = function(event) {
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiHost + '/users/sign_in',
      type: 'POST',
      data: $form.serialize(),
      complete: function(response){
        console.log('from the complete submitlogin callback',response);
      },
    })
    .done(loginSuccess)
    .fail(function(err) {
      console.log(err);
    });
    return false;
  };

  var setupAjaxRequests = function(authToken) {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = 'Token token=' + authToken;
    });
  };

  var signOut = function(event){
    event.preventDefault();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileId');
    authToken = undefined;
    console.log('User has been signed out');
    location.reload();
    window.location.href = '/';
  };

  var loginSuccess = function(userData) {
    console.log('loginSuccess userData: ',userData);
    localStorage.setItem('userId', userData.user_id);
    localStorage.setItem('userName', userData.username);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('profileId', userData.profile_id);
    //Add patch method here.
    // console.log('logged in!');

   // window.location.href = '#/dashboard';
  };

  var acceptFailure = function(error) {
    // If things are failing, deal with specific errors
    // If status is unauthorized, then redirect to a login route/page
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
      window.location.href = '#/sign_in';
    }
  };

  return {run: run,
    setupAjaxRequests: setupAjaxRequests};
})();
