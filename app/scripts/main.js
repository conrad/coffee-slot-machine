// main.js
// $(function() {
var SlotMachine = {
  setup: {},
  postersPerReel: 12,
  reelRadius: 145,
  spinTime: 5,
  degCorrection: 1,
  played: false,
  muted: false,
  win: {},         // organizational objects
  won: false,

};
window.SlotMachine = SlotMachine;



// Setup methods
SlotMachine.setup.placePosters = function(reel, reelNum) {
  var posterAngle = 360 / SlotMachine.postersPerReel;

  for (var i = 0; i < SlotMachine.postersPerReel; i ++) {

    var poster = document.createElement('div');
    poster.className = 'poster';
    // poster.setAttribute('id', 'poster' + reelNum);
    poster.id = 'poster' + reelNum;
    // compute and assign the transform for this poster
    var transform = 'rotateX(' + (posterAngle * i) + 'deg) translateZ(' + SlotMachine.reelRadius + 'px)';
    poster.style.webkitTransform = transform;
    
    // setup the image to show inside the poster
    var content = poster.appendChild(document.createElement('img'));
    // create variable to track which images are alike
    var imageSet = i % 3;
    content.className = 'image';
    content.imageSet = imageSet;
    content.src = SlotMachine.setup.pickPoster(reelNum, imageSet);

    // add the poster to the reel
    reel.appendChild(poster);
  }
};


SlotMachine.setup.pickPoster = function(reelNum, imageSet) {
  // console.log('reelNum', reelNum, 'imageSet', imageSet, 'image string', SlotMachine.images[reelNum][imageSet]);
  return SlotMachine.setup.images[reelNum][imageSet];
};

SlotMachine.setup.images = {
  1: [
    './assets/reel1/coffee-maker2.png',
    './assets/reel1/teapot.png',
    './assets/reel1/espresso-machine.png',
  ],
  2: [
    './assets/reel2/coffee-filter-papers.png',
    './assets/reel2/tea-infuser-2.png',
    './assets/reel2/espresso-tamper.png'
  ],
  3: [
    './assets/reel3/coffee-grounds.png',
    './assets/reel3/loose-tea.png',
    './assets/reel3/espresso-ground-coffee-8-oz.png'
  ]
};

SlotMachine.init = function() {

  // Banner animation
  SlotMachine.slideInElem('banner', 0, 1, 0.75);
  
  SlotMachine.setup.placePosters(document.getElementById('reel-1'), 1);
  SlotMachine.setup.placePosters(document.getElementById('reel-2'), 2);
  SlotMachine.setup.placePosters(document.getElementById('reel-3'), 3);
};

// call init once the document is fully loaded
window.addEventListener('load', SlotMachine.init, false);



/////////////////////////
// GAMEPLAY METHODS
/////////////////////////

SlotMachine.spinReel = function(selector, angle, duration) {
  var easing = 'cubic-bezier(0.535, 0.300, 0.615, 1.040)';
  var spin = 'rotateX(' + angle + 'deg)';
  // console.log('spinReel called with', selector, angle, duration);
  $(selector).css({
      transform        : spin,
      WebkitTransform  : spin,
      MozTransform     : spin,
      msTransform      : spin,
      OTransform       : spin,

      transition       : duration + 's ' + easing,
      WebkitTransition : duration + 's ' + easing,
      MozTransition    : duration + 's ' + easing,
      msTransition     : duration + 's ' + easing,
      OTransition      : duration + 's ' + easing
  });
};


SlotMachine.play = function() {
  // create a final poster and its degrees for each reel
    // order: 0 coffee, 1 tea, 2 espresso, 3 coffee, 4 tea, 5 espresso, 6 coffee, 7 tea, 8 espresso, 9 coffee, 10 tea, 11 espresso
  var final1 = Math.ceil(Math.random() * 12);
  var final2 = Math.ceil(Math.random() * 12);
  var final3 = Math.ceil(Math.random() * 12);
  // console.log(final1, final2, final3);
  var angle1 = (final1 * 30 * SlotMachine.degCorrection) + 720; 
  var angle2 = (final2 * 30 * SlotMachine.degCorrection) + 1800; 
  var angle3 = (final3 * 30 * SlotMachine.degCorrection) + 3240; 

  SlotMachine.spinReel('#reel-1', angle1, SlotMachine.spinTime / 2);
  SlotMachine.spinReel('#reel-2', angle2, SlotMachine.spinTime / 1.5);
  SlotMachine.spinReel('#reel-3', angle3, SlotMachine.spinTime);

  if (final1 % 3 === final2 % 3 && final1 % 3 === final3 % 3) {    // win
    // Wait until reels are done spinning
    
    // var delay = ; 

    setTimeout(function() {
      // console.log('You won... delay:', delay)
      if (final1 % 3 === 0) {             // coffee
        SlotMachine.win.coffee();
      } else if (final1 % 3 === 1) {      // tea      
        SlotMachine.win.espresso();
      } else if (final1 % 3 === 2) {      // espresso
        SlotMachine.win.tea();
      }
    }, (SlotMachine.spinTime * 1000) );
  }

};


/////////////////////////
// ANIMATION METHODS
/////////////////////////

SlotMachine.fadeInElem = function(duration, id, tag, width, height, sizeMeasure, top, bottom, left, right, z, placeMeasure, message, imagePath) {
  var container = document.getElementsByClassName('container')[0];
  var elem = document.createElement(tag);
  $(elem).hide().appendTo(container).fadeIn(duration).css({
    width    : width  + sizeMeasure,
    height   : height + sizeMeasure,
    top      : top    + placeMeasure,
    bottom   : bottom + placeMeasure,
    left     : left   + placeMeasure,
    right    : right  + placeMeasure,
    zIndex   : z,
    position : 'fixed',
  });
  // elem.id = className;
  elem.setAttribute("id", id);
  if (tag === 'img') { 
    elem.src = imagePath;
  }

  if (id === 'congrats') {
    elem.className = 'jumbotron shadowed';
    elem.innerHTML = '<h1>Yes!</h1><h2>You won ' + message + '!</h2>';
    elem.style.color = 'white';
  }

  return elem;
};

SlotMachine.fadeNRemove = function(duration, elem) {
  $(elem).fadeOut(duration);
  setTimeout( function() {
    elem.parentNode.removeChild(elem);
  }, duration);
};


SlotMachine.slideInElem = function (className, direction, duration, delay) {
  // console.log('called slideInElem');
  var easing = 'cubic-bezier(0.520, 0.025, 0.060, 1.575)';
  var slideIn = 'translateX(' + direction + 'px)';

  $('.' + className).css({
      transform        : slideIn,
      WebkitTransform  : slideIn,
      MozTransform     : slideIn,
      msTransform      : slideIn,
      OTransform       : slideIn,

      transition       : duration + 's ' + easing,
      WebkitTransition : duration + 's ' + easing,
      MozTransition    : duration + 's ' + easing,
      msTransition     : duration + 's ' + easing,
      OTransition      : duration + 's ' + easing,

      transitionDelay  : delay + 's',
      transitionDelay  : delay + 's',
      WebkitTransitionDelay: delay + 's',
      MozTransitionDelay: delay + 's',
      OTransitionDelay : delay + 's'

  });
};

/////////////////////////
// WIN / GAME-END METHODS
/////////////////////////

SlotMachine.win.coffee = function() {
  // put some good stuff in here. jQuery, gifs, ...
  console.log('Win Coffee!');
  $('.audio-player')[0].play();

  // dur, id, tag, w, h, t, b, l, r, z, measurement, path
  var congrats = SlotMachine.fadeInElem(500, 'congrats', 'div', 300, 240, 'px', 20, null, 35, null, 9, '%', 'COFFEE');

  var cooper = SlotMachine.fadeInElem(3500, 'cooper', 'img', 305, 342, 'px', null, -27, 0, null, 10, 'px', null, '../assets/win/coffee/cooper-thumbs-up.png');

  var audio = new Audio("../assets/win/coffee/damn-fine-coffee.mp3");
  document.body.appendChild(audio);
  audio.className = 'cooper-audio';
  $('#cooper').on('click', function() {
    if (!SlotMachine.muted) {
      $('.cooper-audio')[0].play();
    }
  });

  // Remove these divs
  setTimeout( function() {
    SlotMachine.fadeNRemove(2000, cooper);
    SlotMachine.fadeNRemove(1500, congrats);
    SlotMachine.won = false;
  }, 6500);  

  setTimeout(function() {
    audio.parentNode.removeChild(audio);
  }, 15000);
};

SlotMachine.win.tea = function() {
  // put some good stuff in here. jQuery, gifs, 
  console.log('Win Tea!');
  $('.audio-player')[0].play();

  // dur, id, tag, w, h, t, b, l, r, z, measurement, path

  var congrats = SlotMachine.fadeInElem(2000, 'congrats', 'div', 300, 240, 'px', 20, null, 20, null, 11, '%', 'TEA!');

  var container = document.getElementsByClassName('container')[0];
  var ozzy = document.createElement('img');
  var slash = document.createElement('img');

  $(ozzy).appendTo(container);
  $(slash).appendTo(container);


  // SlotMachine.fadeInElem = function(duration, id, tag, width, height, sizeMeasure, top, bottom, left, right, z, placeMeasure, message, imagePath) 

  // SlotMachine.fadeInElem(2, 'ozzy', 'img', 500, 500, 'px', 0, null, 0, null, 13, 'px', null, '../assets/win/tea/ozzy.png');

  //   var container = document.getElementsByClassName('container')[0];
  //   var elem = document.createElement(tag);
  //   $(elem).hide().appendTo(container).fadeIn(duration).css({
  //     width    : width  + sizeMeasure,
  //     height   : height + sizeMeasure,
  //     top      : top    + placeMeasure,
  //     bottom   : bottom + placeMeasure,
  //     left     : left   + placeMeasure,
  //     right    : right  + placeMeasure,
  //     zIndex   : z,
  //     position : 'fixed',
  //   });
  //   // elem.id = className;
  //   elem.setAttribute("id", id);
  //   if (tag === 'img') { 
  //     elem.src = imagePath;
  //   }



  // Remove these divs
  setTimeout( function() {
    SlotMachine.fadeNRemove(1500, congrats);
    SlotMachine.fadeNRemove(2500, ozzy);
    SlotMachine.fadeNRemove(4500, slash);
    SlotMachine.won = false;
  }, 6000);  

  setTimeout(function() {
    // audio.parentNode.removeChild(audio);
  }, 20000);

};


SlotMachine.win.espresso = function() {
  // put some good stuff in here. jQuery, gifs, 
  console.log('Win Espresso!');
  $('.audio-player')[0].play();

  // dur, id, tag, w, h, sizeMeasure, t, b, l, r, placeMeasure, z, message, path
  var congrats = SlotMachine.fadeInElem(2000, 'congrats', 'div', 300, 240, 'px', 20, null, 20, null, 11, '%', 'ESPRESSO');

  var kanye = SlotMachine.fadeInElem(1000, 'kanye', 'img', 466, 698, 'px', 20, null, null, 100, 10, 'px', null, '../assets/win/espresso/kanye-suit.gif');

  var audio = new Audio("../assets/win/espresso/stronger.mp3");
  document.body.appendChild(audio);
  audio.className = 'kanye-audio';
  $('#kanye').on('click', function() {
    if (!SlotMachine.muted) {
      $('.kanye-audio')[0].play();
    }
  });

  // Remove these divs
  setTimeout( function() {
    SlotMachine.fadeNRemove(2500, kanye);
    SlotMachine.fadeNRemove(1500, congrats);
    SlotMachine.won = false;
  }, 6000);  

  setTimeout(function() {
    audio.parentNode.removeChild(audio);
  }, 20000);
};


/////////////////////////
// CONTROLS
/////////////////////////

// Play when play button is clicked
$('#play').on('click', function() {
  if (!SlotMachine.played & !SlotMachine.won) {
    SlotMachine.play();
    SlotMachine.played = true;
    $('#play').html('Play Again?').removeClass('btn-success').addClass('btn-danger');
  } else {
    SlotMachine.spinReel('#reel-1', 0, 0.25);
    SlotMachine.spinReel('#reel-2', 30, 0.5);
    SlotMachine.spinReel('#reel-3', 60, 0.75);
    SlotMachine.played = false;
    $('#play').html('Play!').removeClass('btn-danger').addClass('btn-success');
  }
});

$('#coffee').on('click', function() {
  if (!SlotMachine.won) {
    SlotMachine.spinReel('#reel-1', 360 * SlotMachine.degCorrection, 0.5);
    SlotMachine.spinReel('#reel-2', 360 * SlotMachine.degCorrection, 0.5);
    SlotMachine.spinReel('#reel-3', 360 * SlotMachine.degCorrection, 0.5);
    SlotMachine.win.coffee();
    SlotMachine.played = true;
    SlotMachine.won = true;
    $('#play').html('Play Again?').removeClass('btn-success').addClass('btn-danger');
  }
});

$('#tea').on('click', function() {
  if (!SlotMachine.won) {
    SlotMachine.spinReel('#reel-1', 420 * SlotMachine.degCorrection, 0.5);
    SlotMachine.spinReel('#reel-2', 420 * SlotMachine.degCorrection, 0.5);
    SlotMachine.spinReel('#reel-3', 420 * SlotMachine.degCorrection, 0.5);
    SlotMachine.win.tea();
    SlotMachine.played = true;
    SlotMachine.won = true;
    $('#play').html('Play Again?').removeClass('btn-success').addClass('btn-danger');
  }
});

$('#espresso').on('click', function() {
  if (!SlotMachine.won) {
    SlotMachine.spinReel('#reel-1', 390 * SlotMachine.degCorrection, 0.5);
    SlotMachine.spinReel('#reel-2', 390 * SlotMachine.degCorrection, 0.5);
    SlotMachine.spinReel('#reel-3', 390 * SlotMachine.degCorrection, 0.5);
    SlotMachine.win.espresso();
    SlotMachine.played = true;
    SlotMachine.won = true;
    $('#play').html('Play Again?').removeClass('btn-success').addClass('btn-danger');
  }
});

$('#mute').on('click', function() {
  // var attr = $('.audio-player').prop('muted');
  if (!SlotMachine.muted) {
    $('.audio-player').prop('muted', true);
    $('#mute').html('UnMute');
    SlotMachine.muted = true;
  } else {
    $('.audio-player').prop('muted', false);
    $('#mute').html('Mute');
    SlotMachine.muted = false;
  }
});

// })();
