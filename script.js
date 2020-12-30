(function() {
var VIDEO_APPEND = "&modestbranding=0&showinfo=0&rel=0"
var VIDEO_URLS = {
  S1AD: "https://www.youtube.com/embed/qjav2fe3oBY?autoplay=0",
  S2AD: "https://www.youtube.com/embed/-zRvrvHP-PQ?autoplay=0",
  S2PERFORMANCE: "https://www.youtube.com/embed/k3Irn7EQMl0?autoplay=1",
  S3AD: "https://www.youtube.com/embed/R-KUTsj7IWs?autoplay=0",
  CREDITS: "https://www.youtube.com/embed/HCeM-uQ9qn4?autoplay=0"
}
var videos = [
  "https://vimeo.com/495120707/1c7f5341f7", // real
  "https://vimeo.com/495661645/75bbd45d65", // real
  "https://vimeo.com/495661846/ef80712e3f", // virtual
  "https://vimeo.com/495661846/ef80712e3f", // virtual
]

var vr = "https://hubs.mozilla.com/tJPQ7Pr/pastel-twin-universe?embed_token=6b20f7f4f25c9bd86da91bcdd14d0610";
//<iframe src="https://hubs.mozilla.com/tJPQ7Pr/pastel-twin-universe?embed_token=6b20f7f4f25c9bd86da91bcdd14d0610" style="width: 1024px; height: 768px;" allow="microphone; camera; vr; speaker;"></iframe>

class History {
  constructor() {
    this.hist = {}
  }

  watch(idx) {
    this.hist[idx] = true;
  }

  getNumberWatched() {
    var watched = 0;
    for (var i = 0; i < 4; i++) {
      if (this.hist[i]) watched++;
    }
    return watched;
  }

  getUnwatchedVideo() {
    if (!this.hist[0]) return 0;
    if (!this.hist[1]) return 1;
    if (!this.hist[2]) return 2;
    if (!this.hist[3]) return 3;
  }

  isFinished () {
    if (this.hist[0] && this.hist[1] && this.hist[2] && this.hist[3]) {
      return true;
    }
    return false;
  }
}

var history = new History();

var GAME_URL = "https://archive.org/embed/msdos_Prince_of_Persia_1990";

var AUDIO_URL = "http://newtype2016.org/E/section3_sound_v1.mp3";

class Pin {
  constructor(x, y, large, onClick) {
    this.x = x;
    this.y = y;
    this.large = large;
    this.onClick = onClick;
  }

  distance(other) {
  }

  render() {
    var cls = this.large ? "pin large" : "pin";
    if (!this.el) {
      this.el = $(`<button class="${cls}"></button>`);
      $('#map').append(this.el);
      this.el.css('left', this.x*100 + "%");
      this.el.css('top', this.y*100 + "%");
      this.el.click(this.onClick);
    }
  }
}

class Line {
  constructor(pin1, pin2) {
    this.pin1 = pin1;
    this.pin2 = pin2;
  }

  render() {
    if (!this.el) {
      this.el = $(`<div class="line"></div>`);
    }
  }
}

var pins = {
  "1" : [
    new Pin(0.3, 0.15, true, function(){ showVideo(1) }),
    new Pin(0.2, 0.10, false, function(){ alert("asdfasdF")}),
    new Pin(0.1, 0.10, false, function(){ alert("ddd")}),
  ]
}

/*pins['1'].forEach(element => {
  element.render();
});*/

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
      Math.random > 0.5 ? showVideo(0) : showVideo(1);
    }
    if (val == "virtual") {
      showVideo(2);
    }
  });
  setTimeout(function(){
    $(".fader").addClass('fadeout');
    setTimeout(function(){
      //$(".fader").removeClass("in");
      mIntro.modal('show');
    }, 3000);
  }, 1000);
/*
show intro modal
hide intro modal
show question 1
show movie 1
*/

  var i = null;
  $("body").mousemove(function() {
      clearTimeout(i);
      //$(".menu").fadeIn(500);
      toggleMenu(true);
      i = setTimeout(function () {
        console.log("fadeout menu");
        toggleMenu(false);
      }, 5000);
  });
  $(".menu").hide();
  /*.mouseleave(function() {
      clearTimeout(i);
      $(".menu").fadeOut(1000);  
  });
  */

  $("#btn-next").click(function () {
    if (player) {
      var mIntro = createModal('next', function(val){
        if (val == "next") {
          // todo show next
          player.destroy();
          player = null
          showNextVideo();
        }
      });
      mIntro.modal('show');
  }});
}

function showNextVideo(idx) {
  if (history.isFinished()) {
    var credit = createModal('credit', function(val){
      location.reload();
    });
    credit.modal('show');
  } else {
    var watched = history.getNumberWatched();
    watched++;
    var question = createModal('q'+watched, function(val){
      showVideo(history.getUnwatchedVideo());
    });
    question.modal('show');
  }
}

function toggleMenu(toggle) {
  if (toggle) {
    $(".menu").fadeIn(500);
  } else {
    $(".menu").fadeOut(800);
  }
}

function changeBackground(filename) {
  if (filename) {
    $('body').css('background-image', 'url("' + filename + ')');
  } else {
    $('body').css({'background-image': 'none'});
  }
}

var player;
function showVideo(index) {
  //var iframe = document.querySelector('iframe');
  changeBackground();
  history.watch(index);

  var options = {
    url: videos[index]
  }

  player = new Vimeo.Player('player', options);

  player.on('play', function() {
    console.log('Played the video');
  });
  player.play();
  
  player.on('ended', function() {
    console.log('ended the video');
    player.destroy();
    player = null;
    showNextVideo();
  });

  player.getVideoTitle().then(function(title) {
    console.log('title:', title);
  });
}

everything();


})();


