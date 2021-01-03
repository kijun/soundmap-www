(function() {

var videos = [
  "https://vimeo.com/496053974", // santa - real
  "https://vimeo.com/496030848", // ginari - real
  "https://vimeo.com/496142012", // saeta - virtual
  "https://vimeo.com/496030173", // budren - virtual 
]

var modal_src = document.getElementById("modal-template").innerHTML;
var modal_tmpl = Handlebars.compile(modal_src);

var modal_content = {
  "1": {
    "body": "hello world",
    "buttons": [
      {"value": 1, "text": "asdfasdf"}
    ]
  },
  "intro-1": {
    "body": `
    <p>
    <b>다중 공간에서의 사운드맵 프로젝트</b>는 
    장소와 공간 기반의 공연 형식의 확장 가능성에 대한 실험과
    동시에 온라인 미디어 기반 예술 창작물을 제작하는 의도로 기획되었습니다.
    </p>

    <p>
    총 네 개의 공간과 음악, 영상을 20분에 걸쳐 감상하실 수 있습니다.
    </p>
    `,
    "buttons": [
      {"text": "시작하기"}
    ]
  },
  "intro-2": {
    "body": `
    이 프로젝트는 실제 공간 네 곳을 정하고, 그 곳에서 많이 불리우던 음악을 선택한 뒤 가창자의 노래를 전자음악으로 편곡하였다. 정가, 경기민요, 서도민요, 남도민요(판소리) 가창자는 이수대엽 버들은, 경기민요 산타령, 서도민요 긴아리, 남도민요 새타령을 불렀다. 이 중 두 곡은 실제 공간에서 실사 촬영을 통해 영상이 제작이 되었고, 두 곡은 가상 공간 안에서 제작이 되었다. 관객은 서로 다른 공간, 다른 스타일의 음악, 영상을 경험하면서 버추얼 안에서 여행을 하게 된다. 
    `,
    "buttons": [
      {"text": "다음으로"}
    ]
  },
  "intro-3": {
    "body": "다중공간에서의 사운드맵 프로젝트 3",
    "buttons": [
      {"text": "다음"}
    ]
  },
  "q1": {
    "body": "여행은 커녕 이동하기도 힘든 팬데믹의 시대입니다. 바다와 산, 존재하지 않는 실제 공간같은 세계와 가상 세계. 어느 곳에 먼저 가볼까요?",
    "buttons": [
      {"value": "real", "text": "실제공간"},
      {"value": "virtual", "text": "가상사계"}
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
  /*
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
  */
  setTimeout(function(){
    $(".fader").addClass('fadeout');
    setTimeout(function(){
      //$(".fader").removeClass("in");
      //mIntro.modal('show');
      showModal("intro-1",
        nextModal("intro-2",
        nextModal("intro-3",
        nextModal("q1", function(val) {
          if (val == "real") {
            Math.random > 0.5 ? showVideo(0) : showVideo(1);
          }
          if (val == "virtual") {
            Math.random > 0.5 ? showVideo(2) : showVideo(3);
          }
        }))));
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

everything();


//var context = { title: "My New Post", body: "This is my first post!" };

//var myModalEl = document.getElementById('modal-intro');
function showModal(elemId, onClick) {
  var data = modal_content[elemId+""];
  data["modal-id"] = elemId;
  var html = modal_tmpl(data);
  var result = $("body").append(html);
  var modalElem = $('#modal-'+elemId);
  console.log(modalElem);
  modalElem.find('button').click(function(){
    onClick(this.value);
  });
  modalElem.modal('show');
  return modalElem;
}

function nextModal(modalId, onClick) {
  return function(clickValue) {
    showModal(modalId, onClick);
  }
}

})();


