'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = (function(){
  var apiHost='http://localhost:3000/';

  var Router = Backbone.Router.extend({
    routes:{
      '': 'home',
      'home':'home',
      'signup':'signup',
      'signin':'signin',
      'dashboard':'dashboard',
      'profile':'profile',
      'matchProfile/:id':'matchProfile',
      'addImage':'addImage'
    },
    home: function(){
      $('#matchRow').empty();
      $('#container').empty();
      $.ajax({
        url: apiHost + 'profiles',
        type:'GET'
      }).done(function(response){
        var indArr = randomFour(response.length);
        var randProfiles = indArr.map(function(ind){
          return(response[ind]);
        });
        randProfiles.map(function(profile){
          if(profile.featureImage == null){
            profile.featureImage = 'https://s3.amazonaws.com/datingapp-wdi/uploads/default-blue_300x300.png';
          }
        });
        var template = Handlebars.compile($('#homeTemplate').html());
        $('#container').html(template({
          profiles: randProfiles
        }));
      }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
        }).always(function(response){
          trace(response);
      });
    },

    signup: function(){
      $('#matchRow').empty();
      $('#container').empty().load('partials/signup.html', function(response,status,xhr){
      Registration.run();
      });
    },

    signin: function(){
      $('#matchRow').empty();
      $('#container').empty().load('partials/signin.html', function(response,status,xhr){
      Registration.run();
      });
    },

    dashboard: function(){
      $('#container').empty();
      $('#matchRow').empty().load('dashboard.html', function(response,status,xhr){
      Dashboard.getMatchesSnapshots();
      });
    },

    profile: function(){
      $('#matchRow').empty();
      $('#container').empty().load('partials/profile.html', function(response,status,xhr){
        Dashboard.getUserProfile();
      });
    },

    matchProfile: function(){
      var locate = window.location.hash;
      var point = locate.lastIndexOf('/');
      var profileId = parseInt(locate.substring(point+1, locate.length));
      $('#container').empty();
      $('#matchRow').empty().load('partials/match_profile.html', function(response,status,xhr){
        Dashboard.aMatchProfile(profileId);
      });
    },

    addImage: function(){
      $('#matchRow').empty();
      $('#container').empty().load('dashboard.html', function(response,status,xhr){
        Dashboard.getAmazonJson();
      });
    },
  });

  var randomFour = function(max){
    var indArr = [];
    var tempNum;
    for(var i = 0; i < 4; i++){
      tempNum = (Math.floor(Math.random() * (max - 0)) + 0);
      if (indArr.indexOf() < 0){
        indArr.push(tempNum);
      }
    }
    return(indArr);
   };

  return {Router:Router};
})();

var router = new App.Router();
Backbone.history.start();

$(document).ajaxStart(function(e){
  $('section#ajax-preloader').fadeIn();
});

$(document).ajaxComplete(function(e, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});
