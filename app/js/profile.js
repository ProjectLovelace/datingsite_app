'use strict';

var Dashboard = (function(module) {

  module.getUserProfile = function(){
   // Registration.setupAjaxRequests(module.authToken);
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
    var template = Handlebars.compile($('#userProfileTemplate').html());
      $('#container').html(template({
        userProfile: profile
      }));
  };

  return module;

})(Dashboard || {});
