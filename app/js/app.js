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
      //http://localhost:9000/#
    },
    home: function(){
      $('#container').empty();
      $.ajax({
        url: apiHost + 'profiles',
        type:'GET'
      }).done(function(response){
        trace(response);// call method to filter for limited number of images
        var template = Handlebars.compile($('#homeTemplate').html());

      $('#container').html(template({
        profiles: response
      }));
      }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
        }).always(function(response){
          trace(response);
      });
    },

    signup: function(){
      $('#container').empty().load('partials/signup.html', function(response,status,xhr){
      Registration.run();
   //   trace(response,status,xhr);
      });
    },

    signin: function(){
      $('#container').empty().load('partials/signin.html', function(response,status,xhr){
      Registration.run();
   //   trace(response,status,xhr);

      });
    },

    dashboard: function(){
      $('#container').empty().load('dashboard.html', function(response,status,xhr){
      Dashboard.run();
    //  trace(response,status,xhr);
      });
    },

    profile: function(){
      $('#container').empty().load('partials/profile.html', function(response,status,xhr){
      Dashboard.getUserProfile();
   //   trace(response,status,xhr);
      });
    },

    matchProfile: function(){
      var locate = window.location.hash;
      var point = locate.lastIndexOf('/');
      var profileId = parseInt(locate.substring(point+1, locate.length));
      $('#container').empty().load('partials/match_profile.html', function(response,status,xhr){
        Dashboard.aMatchProfile(profileId);
      });
    },

    addImage: function(){
      $('#container').empty().load('dashboard.html', function(response,status,xhr){
        Dashboard.getAmazonJson();
      });
    },
  });

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
