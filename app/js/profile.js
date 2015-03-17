'use strict';

var Dashboard = (function(module) {
 // var authToken, apiHost;
 // var bucketUrl = "https://s3.amazonaws.com/datingapp-wdi/uploads/";
 // var apiHost = 'http://localhost:3000/';
  //var authToken = localStorage.getItem('authToken')
  module.setupAjaxRequests = function () {
      $.ajaxPrefilter(function( options ) {
          options.headers = {};
          options.headers['AUTHORIZATION'] = 'Token token=' + authToken;
      });
  };

  module.getUserProfile = function(){
    debugger;
    Registration.setupAjaxRequests(module.authToken);
    var profile_id = 1;
    $.ajax({
      url: module.apiHost + 'profiles/' + profile_id,
      type: 'GET',
      dataType: 'JSON'
    })
    .done(function(data){
      module.showUserProfile(data);
    })
    .fail(function() {
      console.log("error");
    });
  };

  module.showUserProfile = function(profile) {
    debugger;
    var template = Handlebars.compile($('#userProfileTemplate').html());
      $('#container').html(template({
        userProfile: profile
      }));
  };

  return module;

})(Dashboard || {});
