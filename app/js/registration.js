'use strict';
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var Registration = (function(){
  var authToken, apiHost;

  var run = function(){
    $('#registrationForm').on('submit', submitRegistration);
    $('#loginForm').on('submit', submitLogin);
    $('#signOut').on('click', signOut);

  //  authToken = localStorage.getItem('authToken');
    apiHost = 'http://localhost:3000/';
   // setupAjaxRequests();
  };

  var submitRegistration = function(event){
    event.preventDefault();
    localStorage.setItem('locationId', $('#user-region').val());
    $.ajax({
      url:apiHost + '/users',
      type: 'POST',
      data: {
        user:
        {
          username: $('#username').val(),
          email: $('#email').val(),
          password: $('#password').val(),
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

  var setupAjaxRequests = function(tempAuthToken) {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = 'Token token=' + tempAuthToken;
    });
  };

  var signOut = function(event){
    event.preventDefault();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
   // localStorage.removeItem('userName');
    localStorage.removeItem('profileId');
    localStorage.removeItem('locationId');
    authToken = undefined;
    console.log('User has been signed out');
    location.reload();
    router.navigate('/', {trigger:true});
    //window.location.href = '/';
  };

  var loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    authToken = userData.token;
    setupAjaxRequests(authToken);

    localStorage.setItem('userId', userData.user_id);
    localStorage.setItem('profileId', userData.profile_id);
    setUserProfileLocation(localStorage.getItem('locationId'));
    router.navigate('#/dashboard', {trigger:true});
   // window.location.href = '#/dashboard';
  };

  var setUserProfileLocation = function(locationId){
    var profile_id = localStorage.getItem('profileId');
    $.ajax({
      url: apiHost + 'profiles/' + profile_id,
      type: 'PUT',
      data: {
        profile: {
          location_id: locationId,
        }
      },
    })
    .done(function(profile) {
      trace(profile);
    })
    .fail(function() {
      console.log("error");
    });
  };

  var acceptFailure = function(error) {
    // If things are failing, deal with specific errors
    // If status is unauthorized, then redirect to a login route/page
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
      router.navigate('#/sign_in', {trigger:true});
     // window.location.href = '#/sign_in';
    }
  };

  return {
    run: run,
    setupAjaxRequests: setupAjaxRequests
      };

})();
