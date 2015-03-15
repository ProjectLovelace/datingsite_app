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
       getMatchesImages(data)
      //{access_key: "AKIAI5RKTIIAS4GHZTWQ", key: "uploads/9ce3af28-209c-4d9a-9a51-9f4ccc824841", policy: "eydleHBpcmF0aW9uJzogJzIwMTUtMDMtMTVUMDM6MzA6NTguMD…lbmd0aC1yYW5nZScsIDAsIDEwNDg1NzYwXSwKICAgICAgXX0=", signature: "+9d+z2Q/dccejOrSkyO5fiacwf0="}
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
     // debugger;
      renderImage(response, header);
      // var template = Handlebars.compile($('#matchesTemplate').html());
      // $('#container').html(template({
      //   matches: response
      // }));
     // renderImage(response[0].url)
    }).fail(function(jqXHR, textStatus, errorThrow){
          trace(jqXHR, textStatus, errorThrow);
    }).always(function(response){
          trace(response);
    });
  };

  var renderImage = function(etags, header){
    var bucket = new AWS.S3({ params: {Bucket: 'datingapp-wdi'}});
    //AWS.config.credentials = ...;
    //debugger;
   // debugger;
    console.log(header.signature);
    var config = new AWS.Config({accessKeyId: header.access_key, secretAccessKey: header.signature, region: 'us-east-1'});
    // AWS.config.update({accessKeyId: header.access_key, secretAccessKey: header.signature});
    // AWS.config.region = 'us-east-1';

    var params = {Bucket: header.bucket, Key: etags[1].url};
    //s3.getSignedUrl('getObject', params, function(err, url) {
      bucket.getSignedUrl('getObject', params, function(err, url) {
    //  debugger;
      // var template = Handlebars.compile($('#matchesTemplate').html());
      // $('#container').html(template({
      //   matches: url
      //debugger;

      console.log("The URL is", url);
      $('#testImage').append('<img src ="' + url + '">');


     // }));
    });
    // bucket.listObjects(function (err, data) {
    // if (err) {
    //   document.getElementById('status').innerHTML =
    //     'Could not load objects from S3';
    // } else {
    //   document.getElementById('status').innerHTML =
    //     'Loaded ' + data.Contents.length + ' items from S3';
    //   for (var i = 0; i < data.Contents.length; i++) {
    //     document.getElementById('objects').innerHTML +=
    //       '<li>' + data.Contents[i].Key + '</li>';
    //   };
    // };
    // });
  };

  return{
    run:run
  };
})();
