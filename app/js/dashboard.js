'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var Dashboard = (function(module){
  module.authToken =localStorage.getItem('authToken');
  module.bucketUrl = "https://s3.amazonaws.com/datingapp-wdi/uploads/";
  module.apiHost = 'http://localhost:3000/';

  module.run = function(){
    Registration.setupAjaxRequests(module.authToken);
    module.getAmazonJson();
    module.getMatchesImages();
  };

  module.getAmazonJson = function(){
    $.ajax({
      url: module.apiHost + '/amazon/sign_key',
      type: 'GET'
    }).done(function(data){
     //  console.log(data);
     //Add back for showing upload form.
       // var template = Handlebars.compile($('#imageHeaderTemplate').html());
       // $('#container').html(template({
       //   imageHeader: data
       // }));
       module.submitForm(data.key);
    }).fail(function(jqXHR, textStatus, errorThrow){
        trace(jqXHR, textStatus, errorThrow);
    });
  };

  module.submitForm = function(fileName){
    var $form = $('form#imageForm');
    $('body').on('submit',$form, function(e,$form){
      //e.preventDefault();
      module.postImageRails(fileName);
      $($form).submit();
    });
  };

  module.postImageRails = function(imageUrl){
    //need to grab profile_id from somewhere.
    var profile_id = 1;
    $.ajax({
      url: apiHost + 'profiles/'+ profile_id +'/images',
      type: 'POST',
      data: {
        image:
        {
          url: module.bucketUrl + imageUrl,
          profile_id: profile_id
        }
      }
    }).done(function(response){
    //  console.log(response)
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
          trace(response);
    });
  };
  // currently showing all images

  module.getMatchesImages = function(){
    Registration.setupAjaxRequests(module.authToken);
    var location_id = 1;
    $.ajax({
    //  url: apiHost + 'images',
     url: module.apiHost + 'locations/' + location_id,
      type: 'GET',
    }).done(function(response){
    //console.log(response);
      module.renderMatchImages(response);
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
          trace(response);
    });
  };

  module.renderMatchImages = function(matches){
    var template = Handlebars.compile($('#matchesTemplate').html());
      $('#container').html(template({
        snapshots: matches
      }));
  };

  module.aMatchProfile = function(){

    var user_id = localst 'userId'
    $.ajax({
    //  url: apiHost + 'images',
     url: module.apiHost + 'profiles/' + user_id,
      type: 'GET',
    }).done(function(response){
    //console.log(response);
      module.renderAMatchProfile(response);
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
          trace(response);
    });

  };

  module.renderAMatchProfile = function(match){
    var template = Handlebars.compile($('#matchProfileTemplate').html());
      $('#container').html(template({
        matchProfile: match
      }));
  };


  return module;

})(Dashboard || {});
