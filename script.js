(function() {

var videos = [
  "https://vimeo.com/496053974", // santa - real
  "https://vimeo.com/496030848", // ginari - real
  "https://vimeo.com/496142012", // saeta - virtual
  "https://vimeo.com/496030173", // budren - virtual 
]

var modal_src = document.getElementById("modal-template").innerHTML;
var modal_tmpl = Handlebars.compile(modal_src);

var modals = {
  "1": {
    "body": "hello world",
    "buttons": [
      {"value": 1, "text": "asdfasdf"}
    ]
  }
}

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
      Math.random > 0.5 ? showVideo(2) : showVideo(3);
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
    //$(".menu").fadeIn(500);
    $(".menu").fadeTo(500, 1);
  } else {
    $(".menu").fadeTo(800, 0);
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

//everything();


//var context = { title: "My New Post", body: "This is my first post!" };

//var myModalEl = document.getElementById('modal-intro');
function showModalFromTmpl(elemId, onClick) {
  var data = modals[elemId+""];
  data["modal-id"] = elemId;
  var html = modal_tmpl(data);
  var result = $("body").append(html);
  console.log(html);
  var modalElem = $('#modal-'+elemId);
  console.log(modalElem);
  modalElem.find('button').click(function(){
    onClick(this.value);
  });
  modalElem.modal('show');
  return modalElem;
}

showModalFromTmpl("1", function(v) {alert(v)});

})();


