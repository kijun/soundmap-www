(function() {
var VIDEO_APPEND = "&modestbranding=0&showinfo=0&rel=0"
var VIDEO_URLS = {
  S1AD: "https://www.youtube.com/embed/qjav2fe3oBY?autoplay=0",
  S2AD: "https://www.youtube.com/embed/-zRvrvHP-PQ?autoplay=0",
  S2PERFORMANCE: "https://www.youtube.com/embed/k3Irn7EQMl0?autoplay=1",
  S3AD: "https://www.youtube.com/embed/R-KUTsj7IWs?autoplay=0",
  CREDITS: "https://www.youtube.com/embed/HCeM-uQ9qn4?autoplay=0"
}

var GAME_URL = "https://archive.org/embed/msdos_Prince_of_Persia_1990";

var AUDIO_URL = "http://newtype2016.org/E/section3_sound_v1.mp3";

//var myModalEl = document.getElementById('modal-intro');
function createModal(elemId, onClick) {
  var modalElem = $('#modal-'+elemId);
  modalElem.find('button').click(function(){
    onClick(this.value);
  });
  //return new bootstrap.Modal(document.getElementById('modal-'+elemId));
  return modalElem;
}


var everything = function() {
  var mIntro = createModal('intro', function(val){
    mQ1.modal('show');
  });
  var mQ1 = createModal('q1', function(val) {
    if (val == "real") {
      Math.random > 0.5 ? showVideo(1) : showVideo(2);
    }
    if (val == "virtual") {
      showVideo(3);
    }
  });
  mIntro.modal('show');
/*
show intro modal
hide intro modal
show question 1
show movie 1
*/


  var i = null;
  $("body").mousemove(function() {
      clearTimeout(i);
      $(".menu").fadeIn(500);
      i = setTimeout(function () {
        console.log("fadeout menu");
          $(".menu").fadeOut(800);
      }, 5000);
  });
  /*.mouseleave(function() {
      clearTimeout(i);
      $(".menu").fadeOut(1000);  
  });
  */
}

function showVideo(index) {
  var iframe = document.querySelector('iframe');
  var player = new Vimeo.Player(iframe);

  player.on('play', function() {
    console.log('Played the video');
  });
  player.play();

  player.getVideoTitle().then(function(title) {
    console.log('title:', title);
  });
}

/*
function showVideo(index) {
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '2XtKZ2XK1v8',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        'on'
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      //setTimeout(stopVideo, 6000);
      //done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }

  onYouTubeIframeAPIReady();
}
*/

everything();


})();


