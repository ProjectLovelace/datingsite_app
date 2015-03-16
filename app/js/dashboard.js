'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var Dashboard = (function(){
  var authToken, apiHost

  var run = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'http://localhost:3000/';
    Registration.setupAjaxRequests();
    getAmazonJson();
  };

  var getAmazonJson = function(){
    $.ajax({
      url: apiHost + '/amazon/sign_key',
      type: 'GET'
    }).done(function(data){
       console.log(data);
       var template = Handlebars.compile($('#imageHeaderTemplate').html());
       $('#container').html(template({
         imageHeader: data
       }));
       getMatchesImages(data)
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    });
  };
  // currently showing all images
  var getMatchesImages = function(header){
    $.ajax({
      url: apiHost + 'images',
      type: 'GET'
    }).done(function(response){
      renderImages(response);
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
          trace(response);
    });
  };

  var renderImages = function(etags){
    //template for rendering images, issues getting it going will fix later.
   // var template = Handlebars.compile($('#matchesTemplate').html());
   //    $('#container').html(template({
   //      matches: etags
   //    }));
  //temp fix to get it going
  etags.map(function(etag){
    $('#matches').append('<img src="' + etag.url + '">')
    });
  };


  return{
    run:run
  };
})();
