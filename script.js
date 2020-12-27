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

/***** Helpers *****/
jQuery.fn.center = function () {
  this.css("position","absolute");
  this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                              $(window).scrollTop()) + "px");
  this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                              $(window).scrollLeft()) + "px");
  return this;
};

jQuery.fn.nearPoint = function (x, y, dist) {
  var off = this.offset();
  if (Math.pow(off.left - x,2) + Math.pow(off.top - y, 2) < Math.pow(dist, 2)) {
    return true;
  }
  return false;
};

jQuery.fn.playAnimation = function (play) {
  if (play) {
    if (!this.animPlaying) {
      //$("body").css("cursor", "auto");
      this.animContainer.css("animation-play-state", "running");
      this.animPlaying = true;
    }
  } else {
    if (this.animPlaying) {
      //$(document).css("cursor", "pointer");
      this.animContainer.css("animation-play-state", "paused");
      this.animPlaying = false;
    }
  }
  return this;
}

var createIFrame = function(cls, url) {
  return $("<iframe class='content-frame'>").addClass(cls).attr(
    {"webkitallowfullscreen": "true",
     "mozallowfullscreen": "true",
     "allowfullscreen": 1,
     "frameborder": 0,
     "src": url});
}

var createGameIFrame = function(cls, url) {
  return createIFrame(cls, url);
}

var createAudio = function(cls, url) {
  var source = $("<source>").attr({"src": url, "type":"audio/mpeg"});
  return $("<audio>").addClass(cls + " temp-audio").append(source);

}

/***** Sections *****/
var margin_vert = 100;
var margin_horiz = 178.5;
var clickSound = $(".click-sound")[0];

$(".content").height(
  $(window).height() - ($(".header").height() + $(".header").offset().top) );

// Section 1
$("#main-section1-btn").click(function() {
  clickSound.play();
  var frame = $(".section1-frame");
  var next = $(".section1-next-btn");
  var video = createIFrame("section1-video", VIDEO_URLS.S1AD + VIDEO_APPEND);
  var game = createGameIFrame("section1-game", GAME_URL);

  // setup dimension
  var width = $(window).width()-margin_horiz*2;
  var height = $(window).height()-margin_vert*2;

  frame.width(width); frame.height(height);
  video.width(width); video.height(height);
  game.width(640); game.height(420); // resolution is fixed

  // setup button
  next.off("click");
  var showGame = true;
  next.click(function() {
    clickSound.play();
    if (showGame) {
      $(".section3-fadeout").css("background-color", "white");
      $(".section3-fadeout").removeClass("fadein-anim").addClass("fadeout-anim");
      video.remove();
      frame.append(game);
      showGame = false;
    } else {
      hideSections();
    }
    return false;
  });

  // show
    showSection(frame);
  frame.append(video);
  next.offset({left: $(window).width()-80, top: $(window).height()-80}); // order

  return false;
});

// Section 2
$("#main-section2-btn").click(function() {
  clickSound.play();
  var frame = $(".section2-frame");
  var next = $(".section2-next-btn");
  var video1 = createIFrame("section1-video", VIDEO_URLS.S2AD + VIDEO_APPEND);
  var video2 = createIFrame("section1-video", VIDEO_URLS.S2PERFORMANCE + VIDEO_APPEND);

  // setup dimension
  var width = $(window).width()-margin_horiz*2;
  var height = $(window).height()-margin_vert*2;

  frame.width(width); frame.height(height);
  video1.width(width); video1.height(height);
  video2.width(width); video2.height(height);

  // setup button
  next.off("click");
  var showNextVideo = true;
  next.click(function() {
    clickSound.play();
    if (showNextVideo) {
      $(".section3-fadeout").css("background-color", "black");
      $(".section3-fadeout").removeClass("fadein-anim").addClass("fadeout-anim");
      video1.remove();
      frame.append(video2);
      showNextVideo = false;
    } else {
      hideSections();
    }
    return false;
  });

  // show
    showSection(frame);
  frame.append(video1);
  next.offset({left: $(window).width()-80, top: $(window).height()-80}); // order

  return false;
});

$("#main-section3-btn").click(function() {
  clickSound.play();
  var frame = $(".section3-frame");
  var next = $(".section3-next-btn");
  var video = createIFrame("section1-video", VIDEO_URLS.S3AD + VIDEO_APPEND);
  var audio = createAudio("section3-audio", AUDIO_URL);

  // setup dimension
  var width = $(window).width()-margin_horiz*2;
  var height = $(window).height()-margin_vert*2;

  frame.width(width); frame.height(height);
  video.width(width); video.height(height);

  // setup button
  next.off("click");
  var playAudio = true;
  next.click(function() {
    clickSound.play();
    if (playAudio) {
      frame.css("z-index", 0); // set to fade
      $(".section3-fadeout").css("background-color", "black");
      $(".section3-fadeout").removeClass("fadein-anim").addClass("fadeout-fast-anim");
      frame.append(audio);
      setTimeout(function() {
        video.remove();
        frame.css("z-index", 1); // reset to original
      }, 2000);
      setTimeout(function() {
        audio.trigger("play");
      }, 200);
      playAudio = false;
    } else {
      hideSections();
    }
    return false;
  });

  // show
    showSection(frame);
  frame.append(video);
  next.offset({left: $(window).width()-80, top: $(window).height()-80}); // order

  return false;
});

// credits
$(".credits-btn").click(function() {
  var logo = $("#logo");

  hideSections();
  clickSound.play();
  var next = $(".credits-next-btn");
  var video = createIFrame("credits-video", VIDEO_URLS.CREDITS + VIDEO_APPEND);

  // setup dimension
  var vwidth = $(window).width()-margin_horiz*1.5;
  var vheight = $(window).height()-margin_vert*2;

  video.width(vwidth); video.height(vheight);

  var frame;
  if ($(window).width() < 850) {
    frame = $(".credits-frame-mobile");
  } else {
    frame = $(".credits-frame");
    // setup dimension
    var fwidth = logo.width()*3.2;
    var fheight = logo.height()*1.8;

    frame.css("margin-top", $(".header").height()/3+"px");
    frame.width(fwidth); frame.height(fheight);
  }

  // setup button
  next.off("click");
  var showNextVideo = true;
  next.click(function() {
    clickSound.play();
    if (showNextVideo) {
      $(frame).append(video);
      video.css("left", margin_horiz/1.5 + "px");
      video.css("top", margin_vert + "px");
      showNextVideo = false;
    } else {
      hideSections();
    }
    return false;
  });

  // show
    showSection(frame);
  next.offset({left: $(window).width()-80, top: $(window).height()-80}); // order

  return false;
});

/***** Hiding Section *****/
// hide sections if clicked outside
var hideSections = function() {
  $("body").removeClass("overflow");
  $("iframe").remove();
  $(".temp-audio").remove();
  $(".section-frame").hide();
    $(".cir-button").show();
  $(".section3-fadeout").removeClass("fadeout-anim").removeClass("fadeout-fast-anim").addClass("fadein-anim");
};

var showSection = function(section) {
  section.center();
  section.css("display", "flex");
    $(".cir-button").hide();
}

$("body").click(function() { hideSections(); });

/***** Main Icon Movement *****/

var mouseXPos = -1;
var mouseYPos = -1;
var ballLeft = -1;
var ballTop = -1;
var btn1 = $("#main-section1-btn");
btn1.animPlaying = true;
btn1.animContainer = $(".cycle-anim-container");
var btn2 = $("#main-section2-btn");
btn2.animPlaying = true;
btn2.animContainer = $(".circle-anim-container");
var btn3 = $("#main-section3-btn");
btn3.animPlaying = true;
btn3.animContainer = btn3;
$( document ).on( "mousemove", function( event ) {
    mouseXPos = event.pageX;
    mouseYPos = event.pageY;
  checkButton();
});

var checkButton = function() {
  if (btn1.nearPoint(mouseXPos, mouseYPos, 50)) {
    btn1.playAnimation(false);
  } else {
    btn1.playAnimation(true);
  }
  if (btn2.nearPoint(mouseXPos, mouseYPos, 30)) {
    btn2.playAnimation(false);
  } else {
    btn2.playAnimation(true);
  }
  if (btn3.nearPoint(mouseXPos, mouseYPos, 50)) {
    btn3.playAnimation(false);
  } else {
    btn3.playAnimation(true);
  }
};

// catch all
setInterval(function() {
  if (btn1.nearPoint(mouseXPos, mouseYPos, 50)) {
    btn1.playAnimation(false);
  } else {
    btn1.playAnimation(true);
  }
}, 200);

setInterval(function() {
  if (btn2.nearPoint(mouseXPos, mouseYPos, 30)) {
    btn2.playAnimation(false);
  } else {
    btn2.playAnimation(true);
  }
}, 400);

setInterval(function() {
  if (btn3.nearPoint(mouseXPos, mouseYPos, 50)) {
    btn3.playAnimation(false);
  } else {
    btn3.playAnimation(true);
  }
}, 300);


// Intro anim timer
setTimeout(function() {
  $(".section3-fadeout").addClass("fadein-anim");
}, 7000);

setTimeout(function() {
  $("#logo").css("z-index", 0);
  $(".section3-fadeout").css("background-color", "black");
}, 8500);
})();


