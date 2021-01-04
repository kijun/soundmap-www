(function() {

var videos = [
  "https://vimeo.com/496030173", // budren - virtual 
  "https://vimeo.com/496053974", // santa - real
  "https://vimeo.com/496030848", // ginari - real
  "https://vimeo.com/496142012", // saeta - virtual
]

var modal_src = document.getElementById("modal-template").innerHTML;
var modal_tmpl = Handlebars.compile(modal_src);

var modal_content = {
  "p1": {
    "body": `
    <p>
    ‘다중 공간에서의 사운드맵 프로젝트’는 장소와 공간 기반의 사운드맵 프로젝트의 공연 형식 확장 가능성에 대한 실험과 동시에 온라인 미디어 기반 예술 창작물을 제작하며 실제와 가상, 아날로그와 디지털 그리고 오프라인과 온라인 플랫폼에서 작업할 때 우리가 근본적으로 다루어야 하는 가치에 대해 탐색합니다. 
    </p>
    <p>
    이 프로젝트는 실제 공간 네 곳을 정하고, 그 곳에서 많이 불리던 음악을 선택한 뒤 가창자의 노래를 전자음악으로 편곡하였습니다. 정가, 경기민요, 서도민요, 남도민요(판소리) 가창자는 이수대엽 버들은, 경기민요 산타령, 서도민요 긴아리, 남도민요 새타령을 불렀습니다. 이 중 두 곡은 실제공간에서 실사 촬영을 통해 영상이 제작이 되었고, 두 곡은 가상공간 안에서 제작이 되었습니다. 관객은 서로 다른 공간, 다른 스타일의 음악, 영상을 경험하면서 버추얼 안에서 시적 여행을 하게 됩니다. 
    </p>
    <p>
    각기 다른 지역성과 다양한 어법이 섞이는 음악의 형태처럼 관객은 일차원적인 관람이 아닌 던져진 화두 속에서 답을 찾아가는 여정에서 혹은 다중적 공간에 쌓아올린 새로운 층위에서 자신만의 공감각적 음악체험을 하게 됩니다. 순간의 찰나에서부터 대지의 깊은 숨결까지, 미래적이고 추상적인 것에서 부터 따뜻하고 서정적인 것까지, 평면의 웹을 넘어 입체의 가상까지, 실제 공간에서 시작된 음악의 여정은 작가의 심상 그 이상으로 새로운 공간의 축을 확장하게 됩니다.  
    </p>
    `
  },
  "p2": {
    "body": `
    <p>
    조은희는 사운드, 전자음악을 기반으로 다양한 영역의 매체 음악을 만들고 공연을 만들어 왔다. 음악과 노이즈, 서양 전통음악과 한국 전통음악, 사운드 스케이프와 전자음악을 유연하게 엮어내는 방식을 지향해 왔으며 연극, 무용, 영상, 미술, 서커스 등 다양한 예술 분야에서 음악을 작곡, 연주해왔다. 
    </p>
    <p>
    2015년부터 현재까지 공간과 장소성에 주목하는 '사운드맵 프로젝트'를 기획, 공연해오고 있으며 2020년을 전후로 온/오프라인의 특성을 비교하며 공연의 형태를 모색하는 중이다. 
    </p>`
  },
  "p3": {
    "body": `<img src="image/p3-2.png">`,
  },
  "p4": {
    "body": "첫 번째 행선지는 버들은(teaser)입니다.",
  },
  "p5": {
    "body": `
    <i>버들은 실이 되고<br>
    꾀꼬리는 북이 되어<br>
    구십삼춘에 짜 내느니 나의 시름</i>`,
  },
  "p6": { 
    "body": "Movie1",
  },
  "p7": { 
    "body": `팬데믹의 시대에 우리의 세계는 오히려 확장되기도 합니다.<br>
    전자음악과 한국 전통음악의 결합과 같이<br>
    실제와 가상의 경계에서 짧은 꿈을 꾸기도 하죠.`,
  },
  "p8": { 
    "body": `<img src="image/p8.png">`
  },
  "p9": { 
    "body": "Movie2"
  },
  "p10": { 
    "body": "자, 그럼 이제 어떤 공간으로 이동해볼까요?"
  },
  "p11-1": { 
    "body": `이제 우리의 마지막 행선지입니다.
     <audio autoplay>  <source src="audio/pado-1.wav" type="audio/wav"> </audio>`
  },
  "p11-2": { 
    "body": `이제 우리의 마지막 행선지입니다.
     <audio autoplay>  <source src="audio/pado-1.wav" type="audio/wav"> </audio>`
  },
  "p12": { 
    "body": `함께 여행해주셔서 감사합니다. 모두에게 다른 형태로 기억될 ‘다중 공간에서의 사운드맵 프로젝트’였습니다.`
  },
  "q1": {
    "body": `몸을 배척하는 공간에서 장시간 체류해보신 경험이 있으신가요? 모래에 남은 발자국이 바람에 휩쓸려 사라집니다<br><br>
    
    팬데믹의 시대에서 함께 눈을 감고 다음 행선지를 상상해 봅니다.`,
    "buttons": [
      {"value": "real", "text": "먼 바다의 풍경"},
      {"value": "virtual", "text": "잠긴 도시의 문"},
      {"value": "point", "text": "구름과 점"}
    ]
  },
  "q2": {
    "body": "2 여행은 커녕 이동하기도 힘든 팬데믹의 시대입니다. 바다와 산, 존재하지 않는 실제 공간같은 세계와 가상 세계. 어느 곳에 먼저 가볼까요?",
    "buttons": [
      {"value": "real", "text": "실제공간"},
      {"value": "virtual", "text": "가상사계"}
    ]
  },
  "q3": {
    "body": "3 여행은 커녕 이동하기도 힘든 팬데믹의 시대입니다. 바다와 산, 존재하지 않는 실제 공간같은 세계와 가상 세계. 어느 곳에 먼저 가볼까요?",
    "buttons": [
      {"value": "real", "text": "실제공간"},
      {"value": "virtual", "text": "가상사계"}
    ]
  },
  "q4": {
    "body": "4 여행은 커녕 이동하기도 힘든 팬데믹의 시대입니다. 바다와 산, 존재하지 않는 실제 공간같은 세계와 가상 세계. 어느 곳에 먼저 가볼까요?",
    "buttons": [
      {"value": "real", "text": "실제공간"},
      {"value": "virtual", "text": "가상사계"}
    ]
  },
  "audio-1": {
    "body": `<audio autoplay>  <source src="audio/pado-1.wav" type="audio/wav"> </audio>
    <p>2020년 12월 13일 오후 4시 35분, 태안 앞바다</p>`,
    "buttons": [
      {"value": "real", "text": "다음"},
    ]
  },
  "info-1-1": {
    "body": `<img src="image/san-1.jpg">`,
    "buttons": [
      {"value": "more", "text": "다음 사진"},
      {"value": "music", "text": "음악으로"},
    ],
    "action": function(value) {
      if (value == "more") {
        nextModal("info-1-2");
      }
    }
  },
  "info-1-2": {
    "body": `<img src="image/san-2.jpg">`,
    "buttons": [
      {"value": "more", "text": "다음 사진"},
      {"value": "music", "text": "음악으로"},
    ],
    "action": function(value) {
      if (value == "more") {
        nextModal("info-1-2");
      }
    }
  },
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
      console.log("showing intro modal");
      showModal("p1",
        nextModal("p2",
        nextModal("p3",
        nextModal("p4",
        nextModal("p5", function(val) {
          showVideo(0, function() {
            showModal("p7",
            nextModal("p8", function(val) {
              showVideo(1, function() {
                showModal("p10")
              })}))})})))));
        /*
        function(val) {
          if (val == "real") {
            Math.random > 0.5 ? showVideo(0) : showVideo(1);
          } else {
          //if (val == "virtual") {
            Math.random > 0.5 ? showVideo(2) : showVideo(3);
          }
        })))))));
        */
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
    showModal("q"+watched, function(val){
      showVideo(history.getUnwatchedVideo());
    });
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
function showVideo(index, next) {
  //var iframe = document.querySelector('iframe');
  changeBackground();
  history.watch(index);

  var options = {
    url: videos[index]
  }

  function clearNextButton() {
    $("#btn-next").prop("onclick", null).off("click");
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
    clearNextButton();
    next();
    //showNextVideo();
  });

  $("#btn-next").click(function () {
    if (player) {
      var mIntro = createModal('next', function(val){
        if (val == "next") {
          // todo show next
          player.destroy();
          player = null
          clearNextButton();
          next();
        }
      });
      mIntro.modal('show');
    }
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
    if (data["action"]) data["action"](this.value);
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


