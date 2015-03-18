'use strict';

var Dashboard = (function(module) {

  module.getUserProfile = function(){
    var profile_id = localStorage.getItem('profileId');
    $.ajax({
      url: module.apiHost + 'profiles/' + profile_id,
      type: 'GET',
      dataType: 'JSON'
    })
    .done(function(data){
      module.showUserProfileForm(data);
    })
    .fail(function() {
      console.log('error');
    });
  };

  module.showUserProfileForm = function(profile) {
    var template = Handlebars.compile($('#userEditProfileTemplate').html());
    $('#container').html(template({
      editProfile: profile
    }));
    $('body').on('submit','#profile-edit-form',function(e){
      e.preventDefault();
      console.log('events bubbling up and down the dom');
      module.submitUserProfile();
    });
  };

  module.submitUserProfile = function(){
    var profile_id = localStorage.getItem('profileId');
    $.ajax({
      url: module.apiHost + 'profiles/' + profile_id,
      type: 'PUT',
      data: {
        profile: {
          age: $('#user-age-field').val(),
          bio: $('#user-bio-field').val(),
          seeking: $('#user-seeking-field').val(),
          gender: $('#user-gender-field').val(),
          languages: $('#user-languages-field').val()
        }
      },
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    });
  };

  return module;

})(Dashboard || {});
