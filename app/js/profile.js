// 'use strict';
// var trace = function(){
//   for(var i = 0; i < arguments.length; i++){
//     console.log(arguments[i]);
//   }
// };

var Dashboard = (function(module) {

  module.getUserProfile = function(){
    Registration.setupAjaxRequests(localStorage.getItem('authToken'));
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
    if(profile.featureImage == null){
      profile.featureImage = "https://s3.amazonaws.com/datingapp-wdi/uploads/default-blue_300x300.png";
    };
    var template = Handlebars.compile($('#userEditProfileTemplate').html());
    var location = module.matchLocation()
    $('#container').html(template({
      editProfile: profile,
      location: location
    }));
    $('body').on('submit','#profile-edit-form',function(e){
      e.preventDefault();
    //  console.log('events bubbling up and down the dom');
      module.submitUserProfile();
    });
  };

  module.submitUserProfile = function(){
    Registration.setupAjaxRequests(localStorage.getItem('authToken'));
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
          languages: $('#user-languages-field').val(),
          location_id: $('#select-region').val()
        }
      },
    })
    .done(function(profile) {
      localStorage.setItem('locationId', profile.location_id);
     // console.log("success");
      router.navigate('#/dashboard', {trigger:true});
    })
    .fail(function() {
      console.log("error");
    });
  };

  module.matchLocation = function() {
    var locationId = localStorage.getItem('locationId');
  switch (locationId) {
    case '2':
      return("North Shore");
      break;
    case '3':
      return("North West");
      break;
    case '4':
      return("Metro West");
      break;
    case '5':
      return("South Shore");
      break;
    case '6':
      return("Central Mass");
      break;
    case '7':
      return("Cape Cod");
      break;
    default:
      return("Metro Boston")
      break;
    };
  };

  return module;

})(Dashboard || {});
