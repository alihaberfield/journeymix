/* ==========================================================
 * journeymix.js v1
 * ==========================================================
 * Copyright 2013 Ali Haberfield, Ilona Ryv and Sulamita Garcia
 * ========================================================== */

    var sc_id =  '04f21e83ba014f8a83517ef424ec79b6'

    SC.initialize({
      client_id: sc_id
    });

    //Hide and show accordion titles 



    function convertFromMS(ms) {
      var d, h, m, s;  
      s = Math.floor(ms / 1000); 
      m = Math.floor(s / 60);  
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      d = Math.floor(h / 24);
      h = h % 24;  
      return "" + h + " hour : " + m + " mins";
    };


    var widgetIframe = document.getElementById('sc-widget');
    var widget       = SC.Widget(widgetIframe);


    function advancedSearch() {
      $('#list_tracks').empty();
      $('#iframe_div').empty().removeClass('.hide');
      console.log('advancedSearch works');

      var genreValue = $("#free-genre").val();
      var advMinLength = $("#adv-length-min").val();
      var longMinLength = (advMinLength*60000);
      var advMaxLength = $("#adv-length-max").val();
      var longMaxLength = (advMaxLength*60000);
      var keywords = $("#keyword").val();
      var bpmMin = $("#bpm-min").val();
      var bpmMax = $("#bpm-max").val();


      
      $("#searchEcho").html("<p>You searched SoundCloud for <strong>" + genreValue + "</strong> tracks from <strong>" + advMinLength + "</strong> to <strong>" + advMaxLength + "</strong> minutes, and with keywords <strong>" + keywords + "</strong> and with <strong>" + bpmMin + "</strong> to <strong>" + bpmMax + "</strong> beats per minute.</p><p> Here are some Journey Mixes:</p>");

      //Search by BPM is not working- needs testing.

      SC.get('/tracks', { genres: genreValue, q: keywords, duration: {from:longMinLength, to:longMaxLength}, bpm: {from:bpmMin, to:bpmMax} }, function(tracks) {
      var count = 0;
      $(tracks).each(function(index, track) {
        var length_readable = convertFromMS(track.duration);
        if (track.downloadable && (count < 5)) {          
          $('#iframe_div').append($('<li></li>').html('<h3><a href="' + track.permalink_url + '">' + track.title +  '</a>' + ' - ' + length_readable + ' <a class="btn btn-warning" href="' + track.download_url + '?client_id=' + sc_id + '">' + "Download now" + '</a></h3>' + '<iframe id="sc-widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F' + track.id + '&show_artwork=true"></iframe> '));
            count++;
        }
      });

    });      

    }



    function getTracks() {

      $('#list_tracks').empty();
      $('#iframe_div').empty().removeClass('.hide');


      var genreValue = $("#choose").val();
      var inputLength = $("#input_length").val();
      var inputMax = (inputLength*1.2);
      var minLength = (inputLength*60000);
      var maxLength = (minLength*1.2);
      var activityName = $("#activity").val();

      $("#searchEcho").html("<p>You searched SoundCloud for <strong>" + genreValue + "</strong> tracks from <strong>" + inputLength + "</strong> to <strong>" + inputMax + "</strong> minutes for <strong>" + activityName + "</strong> to.</p><p> Here is your Journey Mix:</p>");
      
      SC.get('/tracks', { genres: genreValue, duration: {from:minLength, to:maxLength} }, function(tracks) {
      var count = 0;
      $(tracks).each(function(index, track) {
  
        var duration_readable = convertFromMS(track.duration);
        if (track.downloadable && (count < 1)) { 
        console.log(track);         
          $('#list_tracks').append($('<li></li>').html('<h3><a href="' + track.permalink_url + '">' + track.title + '</a>' + ' - ' + duration_readable + ' - ' + '<a class="btn btn-warning" href="' + track.download_url + '?client_id=' + sc_id + '">' + "Download now" + '</a></h3> <div id="iframe_div"><iframe id="sc-widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F'  + track.id + '&show_artwork=true"></iframe></div> ' ));
            count++;
        }
      });

    });      

    }

  $("#showTracks").click(getTracks);
  $("#advancedShowTracks").click(advancedSearch);