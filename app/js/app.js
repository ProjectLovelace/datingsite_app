'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = (function(){
  var router;
  var url='http://localhost:3000/';

  var init = function(){
    router = new Router();
    Backbone.history.start();
  };

  var Router = Backbone.Router.extend({
    routes:{
      '': 'home',
      'home':'home',
      'signup':'signup'
      //http://localhost:9000/#
    },
    home: function(){
      $('#container').empty();
      $.ajax({
        url: url + 'profiles',
        type:'GET'
      }).done(function(response){
      //  trace(response);
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
        // var $form = $('#signUpForm');
        // $form.on('submit', function(e){
          Registration.run();
        // });
      });
    },

  });

  return {init:init};

})();

$(document).ready(function(){
  App.init();
});

$(document).ajaxStart(function(e){
  trace('starting an ajax request');
  $('section#ajax-preloader').fadeIn();
});

$(document).ajaxComplete(function(e, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});
