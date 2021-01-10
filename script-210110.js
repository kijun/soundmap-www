(function() {

var videos = [
  "https://vimeo.com/496030173", // budren - virtual 
  "https://vimeo.com/496053974", // santa - real
  "https://vimeo.com/496142012", // saeta - virtual
  "https://vimeo.com/496030848", // ginari - real
]

var modal_src = document.getElementById("modal-template").innerHTML;
var modal_tmpl = Handlebars.compile(modal_src);

var modal_content = {
  "p0": {
    "body": `<img src="image/p0.jpeg">`,
  },
  "p1": {
    "body": `
    <p>
    ‘다중 공간에서의 사운드맵 프로젝트(Soundmap Project in Multi Space)’는 장소와 공간 기반의 사운드맵 프로젝트의 공연 형식 확장 가능성에 대한 실험과 동시에 온라인 미디어 기반 예술 창작물을 제작하며 실재와 가상, 아날로그와 디지털 그리고 오프라인과 온라인 플랫폼에서 작업할 때 우리가 근본적으로 다루어야 하는 가치에 대해 탐색합니다. 
    </p>
    <p>
    The Soundmap Project in Multi Space, based on ‘place’ and ‘space’, experiments with the potential to expand the performance format. This project explores the values that fundamentally need to be addressed when working with the real and virtual, analog, and digital platforms.
    </p>`
  },
  "p2": {
    "body": `
    <p>
    이 프로젝트는 공간 네 곳을 정하고, 그 곳에서 많이 불리던 음악을 선택한 뒤 가창자의 노래를 전자음악으로 창작하였습니다. 정가, 경기민요, 서도민요, 남도민요(판소리) 가창자는 이수대엽 버들은, 경기민요 산타령, 서도민요 긴아리, 남도민요 새타령을 불렀습니다. 이 중 두 곡은 실재공간에서 실사 촬영을 통해 영상이 제작이 되었고, 두 곡은 가상공간 안에서 제작이 되었습니다. 관객은 서로 다른 공간, 다른 스타일의 음악, 영상을 경험하면서 버추얼 안에서 시적 여행을 하게 됩니다. 
    </p>
    <p>
    Eunhee Cho focused on four regions, selected the most frequently sung traditional music, and created electronic sounds with vocals. Performers of Jeongga, Gyeonggi folk songs, Seodo folk songs, and Namdo(pansori) folk songs sang Jeongga ‘Isudaeyeop Beodeureun’, Gyeonggi folk song ‘Santaryeong’, Soedo folk song ‘Gin Ari’, and Namdo folk song ‘Saetaryeong’. Two of these pieces filmed in-person while the other two were produced in the virtual space. Audiences take a poetic virtual journey wandering around the diverse spaces, sounds, films and rhythms.
    </p>`
  },
  "p3": {
    "body": `
    <p>
    각기 다른 지역성과 다양한 어법이 섞이는 음악의 형태처럼 관객은 일차원적인 관람이 아닌 던져진 화두 속에서 답을 찾아가는 여정에서 혹은 다중적 공간에 쌓아올린 새로운 층위에서 자신만의 공감각적 음악체험을 하게 됩니다. 순간의 찰나에서부터 대지의 깊은 숨결까지, 미래적이고 추상적인 것에서부터 따뜻하고 서정적인 것까지, 평면의 웹을 넘어 입체의 가상까지. 공간에서 시작된 음악의 여정은 작가의 심상 그 이상으로 새로운 공간의 축을 확장하게 됩니다.
    </p>
    <p>
    Just like the sounds which are the mixtures of various regionalities and expressions,  audiences experience the synesthesia of soundscapes through multi-layered spaces, encountering choices, and traveling to seek answers. From the moment of light to a deep breath of the earth – from abstract to futuristic – from warm to lyrical – beyond the flat screen in the multi-dimensional virtual space. This music journey starting from space extends past the axis of the new space beyond the artist's mind.
    </p>`
  },
  "p4": {
    "body": `
    <p>
    조은희는 사운드, 전자음악을 기반으로 다양한 영역의 매체 음악을 만들고 공연을 만들어 왔다. 음악과 노이즈, 서양 전통음악과 한국 전통음악, 사운드 스케이프와 전자음악을 유연하게 엮어내는 방식을 지향해 왔으며 연극, 무용, 영상, 미술, 서커스 등 다양한 예술 분야에서 음악을 작곡, 연주해왔다.
    </p>
    <p>
    2015년부터 현재까지 공간과 장소성에 주목하는 '사운드맵 프로젝트'를 기획, 공연해오고 있으며 2020년을 전후로 온/오프라인의 특성을 비교하며 공연의 형태를 모색하는 중이다.
    </p>
    <p>
    Eunhee Cho has made media music and performed in various fields with soundscape and electronic sound. She strives to seamlessly weave through the language of music and sound with traditional Western music and Korean Music using soundscape and electronic sound. She has been composing and performing in various fields of works such as theater, dance, film, visual art, circus, etc. 
    </p>
    <p>
    Since 2015, she has directed and performed on the “Soundmap Project” which focuses on a sense of space. Recently she has been researching the format of performances regarding the differences between online and offline throughout the year 2020.
    </p>`
  },
  "p5": {
    "body": `<img src="image/p3-2.png">`,
  },
  "p6": {
    "body": `
    <p>첫 번째 행선지는 버들은(teaser)입니다.</p>
    <p>The first destination is ‘Beodeureun’(the teaser).</p>
    `,
  },
  "p7": {
    "body": `
    <p style="text-align: center">
      <i>"버들은 실이 되고<br>
      꾀꼬리는 북이 되어<br>
      구십삼춘에 짜 내느니 나의 시름"</i>
    </p>
    <p style="text-align: center">
      <i>The willows become threads</br>
      The hummingbird becomes a Buk</br>
      They fly weaving in the sigh of a fresh spring day”</i>
    </p>`,
  },
  "p8": { 
    "body": "Movie1",
  },
  "p9": { 
    "body": `<p>팬데믹의 시대에 우리의 세계는 오히려 확장되기도 합니다.<br>
    전자음악과 한국 전통음악의 결합과 같이<br>
    실제와 가상의 경계에서 짧은 꿈을 꾸기도 하죠.</p>
    <p>Though, in the era of the Pandemic, our world has expanded. </br>
    Like the merging of electronic sound and traditional Korean music, </br>
    sometimes we have a short dream wandering around the boundary of realness. </p>`,
  },
  "p10": { 
    "body": `<img src="image/p8.jpg">`
  },
  "p11": { 
    "body": "Movie2"
  },
  "p12": { 
    "body": `<p>자, 그럼 이제 어떤 공간으로 이동해볼까요?</p>
    <p>Now to which space shall we go?</p>`,
    "buttons": [
      {"value": "saeta", "text": `<img src="image/p10-saeta.png">`},
      {"value": "ginari", "text": `<img src="image/p10-ginari.jpg">`},
    ]
  },
  "p13-1": { // gina
    "body": `<p>이제 우리의 마지막 행선지입니다.</p>
      <p>This is our last destination.</p>`
  },
  "p13-2": { // gina
    "body": `
    <p style="text-align: center">
      <i>"해는 떴다가 지며 그 떴던 곳으로 빨리 돌아가고<br>
      바람은 남으로 불다가 북으로 돌이키며 이리 돌며 저리 돌아 불던 곳으로 돌아가고<br>
      모든 강물은 다 바다로 흐르되 바다를 채우지 못하며 어느 곳으로 흐르든지 그리로 연하여 흐르느니라"</i>
    </p>
    <p style="text-align: center">
      <i>The sun also ariseth, and the sun goeth down, and hasteth to his place where he arose</br>
      The wind goeth toward the south, and turneth about unto the north; it whirleth about continually, and the wind returneth again according to his circuits</br>
      All the rivers run into the sea; yet the sea is not full; unto the place from whence the rivers come, thither they return again"</i>
    </p>
    <audio id="audio-1" autoplay>  <source src="audio/pado-1.wav" type="audio/wav"> </audio>`
  },
  "p14-1": { // saeta
    "body": `<p>이제 우리의 마지막 행선지입니다.</p>
      <p>This is our last destination.</p> 
      <audio id="audio-2" autoplay>  <source src="audio/saeta-1.mp3" type="audio/mp3"> </audio>`
  },
  "p15": { 
    "body": `
    <p>함께 여행해주셔서 감사합니다.<br>모두에게 다른 형태로 기억될 ‘다중 공간에서의 사운드맵 프로젝트’였습니다.</p>
    <p>Thank you for traveling with us. This ‘Soundmap Project in Multi Space’ will be in everyone’s memories – remembered in many different ways.</p>
    `
  },
  "p16": { // credit kor
    "body": `
    <b>다중 공간에서의 사운드맵 프로젝트(Soundmap Project in Multi Space)</b>
    <br>
    기획/작곡 : 조은희 
    <br>
    프로듀서 : 이혜원 
    <br>
    영상작가 : 박민수, 김세진, 김다정, 김수곤
    <br>
    노래 : 김무빈, 성슬기, 안정아, 권송희  
    <br>
    웹사이트 기획개발 : 서기준 
    <br>
    VR 제작 : 기어이(Giioii)
    <br>
    <br>
    2020 서울문화재단 온라인미디어 예술활동지원사업 ART MUST GO ON`
  },
  "p17": { // credit kor
    "body": `
    <b>Soundmap Project in Multi Space</b>
    <br>
    Director/Composer : Eunhee Cho
    <br>
    Producer : Rene Hyewon Lee 
    <br>
    Videographer : Minsoo Park, Sejin Kim, Dajeong Kim, Sugon Kim 
    <br>
    Vocal : Kim Mubin, Sung Seul-gi, Ahn Jung-ah, Kwon Song-hee 
    <br>
    Website management/programming : Kijun Seo
    <br>
    VR Production: Giioii
    <br>
    <br>
    Funded by 2020 Seoul Foundation for Arts and Culture, Arts Creation Grants for online media practice ‘ART MUST GO ON’
    `
  },
  "p18": { // credit kor
    "body": `
    <p style="text-align: center">Contact</p>
    조은희(Eunhee Cho): <a href="mailto:lunassmusic@gmail.com">lunassmusic@gmail.com</a> / <a href="https://www.instagram.com/eunhee_21c">www.instagram.com/eunhee_21c/</a>
    기어이(Giioii) : <a href="https://www.giioii.com">www.giioii.com</a>`
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
  function credit(_) {
    showModal("p15", 
    nextModal("p16",
    nextModal("p17",
    function(_) {
      var credit = createModal('credit', function(_){
        location.reload();
      });
      credit.modal('show');
    })));
  };
  setTimeout(function(){
    $(".fader").addClass('fadeout');
    setTimeout(function(){
      //$(".fader").removeClass("in");
      //mIntro.modal('show');
      console.log("showing intro modal");
      showModal("p0",
        nextModal("p1",
        nextModal("p2",
        nextModal("p3",
        nextModal("p4",
        nextModal("p5",
        nextModal("p6",
        nextModal("p7", function(_) {
          showVideo(0, function() {
            showModal("p9",
            nextModal("p10", function(_) {
              showVideo(1, function() {
                showModal("p12", function(val) {
                  if (val == "saeta") {
                    showVideo(2,
                      nextModal("p13-1",
                      nextModal("p13-2", function(_) {
                        showVideo(3, credit)})));
                  } else {
                    showModal("p13-2", function(_) {
                      showVideo(3,
                        nextModal("p14-1", function(_) {
                          showVideo(2, credit)}))});
                  }
                })
              })}))})}))))))));
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
var NEXT = null;
function showVideo(index, next) {
  NEXT = next;
  var audio = document.getElementById('audio-1');
  if (audio) audio.pause();
  audio = document.getElementById('audio-2');
  if (audio) audio.pause();
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
    NEXT();
    NEXT = null;
    //showNextVideo();
  });

  var clicked = false;
  $("#btn-next").click(function () {
    if (clicked) return;
    clicked = true;
    if (player) {
      var mIntro = createModal('next', function(val){
        if (val == "next") {
          // todo show next
          player.destroy();
          player = null
          clearNextButton();
          NEXT();
          NEXT = null;
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


