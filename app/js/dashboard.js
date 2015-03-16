'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var Dashboard = (function(){
  var authToken, apiHost;
  var bucketUrl = "https://s3.amazonaws.com/datingapp-wdi/uploads/";
  var apiHost = 'http://localhost:3000/';

  var run = function(){
    authToken = localStorage.getItem('authToken');
    Registration.setupAjaxRequests();
    getAmazonJson();
    getMatchesImages();

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
       submitForm(data.key)
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    });
  };

  var submitForm = function(fileName){
    var $form = $('form#imageForm');
  $('body').on('submit',$form, function(e,$form){
    debugger;
      e.preventDefault();
      postImageRails(fileName);
      $($form).submit();
    });
  };

  var postImageRails = function(imageUrl){
    //need to grab profile_id from somewhere.
    debugger;
    var profile_id = 1;
    $.ajax({
      url: apiHost + 'profiles/'+ profile_id +'/images',
      type: 'POST',
      data: {
        images:
        {
          url: bucketUrl + imageUrl,
          profile_id: profile_id
        }
      }
    }).done(function(response){
      debugger;
      console.log(response)
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
          trace(response);
    });
  }
  // currently showing all images
  var getMatchesImages = function(){
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

// $(document).ready(function()
// {

// });
