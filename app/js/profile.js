'use strict';

var Dashboard = (function(module) {



  module.getUserProfile = function(){
  // Registration.setupAjaxRequests(module.authToken);
    var profile_id = localStorage.getItem('profileId');
    $.ajax({
      url: module.apiHost + 'profiles/' + profile_id,
      type: 'GET',
      dataType: 'JSON'
    })
    .done(function(data){
      debugger;
      module.showUserProfileForm(data);
    })
    .fail(function() {
      console.log("error");
    });
  };

  module.showUserProfileForm = function(profile) {
    var template = Handlebars.compile($('#userEditProfileTemplate').html());
      $('#container').html(template({
        editProfile: profile
      }));

      var $form = $('form#profile-edit-form');
    $('body').on('submit',$form, function(e,$form){
      e.preventDefault();
      debugger;
      module.editUserProfile();
     // $($form).submit();
    });
  };

  module.editUserProfile = function(){

  }

  return module;

})(Dashboard || {});
