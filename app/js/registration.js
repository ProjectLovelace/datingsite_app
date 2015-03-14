var Registration = (function(){
  var authToken, apiHost
  // var processForm = function(e, form, router){
  //   if(e.preventDefault) e.preventDefault();
  //   var username = $(form).find("input[username='")
  //   var email =
  //   var password =

  // }
  var run = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'http://localhost:3000';
    setupAjaxRequests();

    $('#registrationForm').on('submit', submitRegistration);
  };

  var submitRegistration = function(e){
    debugger;
    if(e.preventDeafault) e.preventDefault();

    $.ajax({
      url:apiHost + '/users',
      type: 'POST',
      data: {
        user:
        {
          name: $('#username').val(),
          email: $('#email').val(),
          password: $('#password').val()
        }
      },
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
      data: $form.serialize()
    })
    .done(loginSuccess)
    .fail(function(err) {
      console.log(err);
    });

    return false;
  };

  var setupAjaxRequests = function() {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = "Token token=" + authToken;
    });
  };

var loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    console.log('logged in!');
    window.location.href = '/';
  };

  var acceptFailure = function(error) {
    // If things are failing, deal with specific errors
    // If status is unauthorized, then redirect to a login route/page
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
      window.location.href = '/sign_in.html';
    }
  };

  return {run: run};
})();


// $(document).ready(function() {
//   Registration.run();
// });
