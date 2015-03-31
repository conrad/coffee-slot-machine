// main.js
// $(function() {
var SlotMachine = {
  postersPerReel: 12,
  reelRadius: 145,
  spinTime: 5,
  degCorrection: 1,
  played: false,
  muted: false,
  setup: {},
  won: false,
  win: {}         // organizational objects

};
window.SlotMachine = SlotMachine;


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
    // content.textContent = i; 
    // create variable to track which group of images are on the posters
    var imageSet = i % 3;
    content.className = 'image';
    content.imageSet = imageSet;
    content.src = SlotMachine.pickPoster(reelNum, imageSet);
    
    // $(content).attr('src', function() {
    //   console.log(SlotMachine.pickPoster(reelNum, imageSet))
    //   SlotMachine.pickPoster(reelNum, imageSet);
    // });

    // add the poster to the reel
    reel.appendChild(poster);
  }
};

SlotMachine.init = function() {
  SlotMachine.setup.placePosters(document.getElementById('reel-1'), 1);
  SlotMachine.setup.placePosters(document.getElementById('reel-2'), 2);
  SlotMachine.setup.placePosters(document.getElementById('reel-3'), 3);
};

// call init once the document is fully loaded
window.addEventListener('load', SlotMachine.init, false);



SlotMachine.spinReel = function(selector, angle, duration) {
  var easing = 'cubic-bezier(0.535, 0.300, 0.615, 1.040)';
  var spin = 'rotateX(' + angle + 'deg)'
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



SlotMachine.images = {
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

SlotMachine.pickPoster = function(reelNum, imageSet) {
  // console.log('reelNum', reelNum, 'imageSet', imageSet, 'image string', SlotMachine.images[reelNum][imageSet]);
  return SlotMachine.images[reelNum][imageSet];
};


SlotMachine.win.coffee = function() {
  // put some good stuff in here. jQuery, gifs, ...
  console.log('Win Coffee!');
  $('.audio-player')[0].play();

  // dur, id, tag, w, h, t, b, l, r, z, measurement, path
  var congrats = SlotMachine.fadeInElem(500, 'congrats', 'div', 60, 30, 20, null, 20, null, 9, '%', 'COFFEE');

  var cooper = SlotMachine.fadeInElem(3500, 'cooper', 'img', 305, 342, null, -27, 0, null, 10, 'px', null, '../assets/win/coffee/cooper-thumbs-up.png');

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

  SlotMachine.won = false;


};


SlotMachine.win.espresso = function() {
  // put some good stuff in here. jQuery, gifs, 
  console.log('Win Espresso!');
  $('.audio-player')[0].play();

  // dur, id, tag, w, h, t, b, l, r, z, measurement, message, path
  var congrats = SlotMachine.fadeInElem(2000, 'congrats', 'div', 60, 30, 20, null, 20, null, 11, '%', 'ESPRESSO');

  var kanye = SlotMachine.fadeInElem(1000, 'kanye', 'img', 466, 698, 20, null, null, 100, 10, 'px', null, '../assets/win/espresso/kanye-suit.gif');

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


SlotMachine.fadeInElem = function(duration, id, tag, width, height, top, bottom, left, right, z, measurement, message, imagePath) {
  var container = document.getElementsByClassName('container')[0];
  var elem = document.createElement(tag);
  $(elem).hide().appendTo(container).fadeIn(duration).css({
    width    : width  + measurement,
    height   : height + measurement,
    top      : top    + measurement,
    bottom   : bottom + measurement,
    left     : left   + measurement,
    right    : right  + measurement,
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
    var shadow = '2px';
  }

  return elem;
};

SlotMachine.fadeNRemove = function(duration, elem) {
  $(elem).fadeOut(duration);
  setTimeout( function() {
    elem.parentNode.removeChild(elem);
  }, duration);
};



// })();








    // console.log(this.spin);

    // works... but not transition:
    // WebkitTransform: 'rotateX(300deg)',
    // transform: 'rotateX(300deg)',
    // MozTransform: 'rotateX(300deg)',
    // WebkitTransform: 'rotateX(300deg)',
    // msTransform: 'rotateX(300deg)'

    // webkitTransition : 'rotateX(' + angle + 'deg) ' + duration +,
    // WebkitTransition : 'rotateX(' + angle + 'deg) ' + duration + 's cubic-bezier(0.770, 0.115, 0.420, 1.040)',
    // MozTransition    : 'rotateX(' + angle + 'deg) ' + duration + 's cubic-bezier(0.770, 0.115, 0.420, 1.040)',
    // MsTransition     : 'rotateX(' + angle + 'deg) ' + duration + 's cubic-bezier(0.770, 0.115, 0.420, 1.040)',
    // OTransition      : 'rotateX(' + angle + 'deg) ' + duration + 's cubic-bezier(0.770, 0.115, 0.420, 1.040)',
    // transition       : 'rotateX(' + angle + 'deg) ' + duration + 's cubic-bezier(0.770, 0.115, 0.420, 1.040)'

// $(selector).css('webkit-transform', ).css('webkit-transition-duration', duration + 's').css('transition-duration', duration + 's');
// $(selector).css('webkitTransform', 'rotateX(' + angle + 'deg)').css('webkitTransitionDuration', duration + 's').css('transitionDuration', duration + 's');


// start & stop spinning with play button  - make it #play
// $('#playThis').on('click', function(){
//   $('#reel-1').toggleClass('active');
//   $('#reel-2').toggleClass('active');
//   $('#reel-3').toggleClass('active');
//   if ( !($('#reel-1').hasClass('active')) ) {
//     $('#play').html('Play!').removeClass('btn-danger').addClass('btn-success');
//   } else {
//     $('#play').html('Play Again?').removeClass('btn-success').addClass('btn-danger');
//   }

  // _.debounce(function(e) { ... }, 9100);
  // if ( !($('#reel-1').hasClass('active')) ) {
  //   $('#reel-1').addClass('active');
  //   $('#reel-2').addClass('active');
  //   $('#reel-3').addClass('active');
  //   $('#play').off('click');
  //   setTimeout(function() {
  //     $('#reel-1').removeClass('active');
  //     $('#reel-2').removeClass('active');
  //     $('#reel-3').removeClass('active');
  //   }, 9100);
// });






// SlotMachine.getCssRules = function() {
//     //  CSS rule object conditional for cross-browser compatibility
//     if (document.styleSheets[0].cssRules) {
//       return document.styleSheets[0].cssRules;
//     } else if (document.styleSheets[0].rules) {
//       return document.styleSheets[0].rules;
//     }
//     return null;
// };

// // find the desired CSS rules to control outcomes dynamically
//   // rules: 'spin-1', 'spin-2', & 'spin-3'
// SlotMachine.findCssRule = function (selector) {
  
//   var rules = SlotMachine.getCssRules();

//   for (var j = 0; j < rules.length; ++j) {
//     if (rules[j].selectorText === selector) {
//       console.log('Rule found:', rules[j], 'at', j);
//       return [rules[j], j];
//     }
//   }
//   console.log('Rule not found');
//   return null;
// };


// // Replaces the animation hard-coded specifications
// SlotMachine.editReelSpinRule = function(angle, duration, selector) {
//   var ruleInfo = SlotMachine.findCssRule(selector);
//   var rule = ruleInfo[0];
//   var ruleIndex = ruleInfo[1];
//   var length = rule.cssText.length;
//   console.log
//   rule.cssText = selector, '{ -webkit-transform: rotateX(' + angle + '); -webkit-transition-duration: ' + duration + 's; transition-duration: ' + duration + 's; }';

//   // document.styleSheets[0].cssRules[ruleIndex].cssText = rule.cssText;
//   // console.log(selector, '{ -webkit-transform: rotateX(' + angle + '); -webkit-transition-duration: ' + duration + 's; transition-duration: ' + duration + 's; }');
//   // console.log(rule.cssText);
//   var ruleText = [];  
//   for(var i = 0; i < length; i ++)
//   {
//     keyframeString.push(keyframes[i].keyText); 
//   }
    

//   // delete original rule
//   for (var i = 0, j = ruleText.length; i < j; i ++) {
//     rule.deleteRule(ruleText[i]);
//   }


//   console.log('editReelSpinRule called on', selector);
//   console.log('The Current Value of the Rule:',document.styleSheets[0].cssRules[ruleIndex].cssText);

//   // .deleteRule?
//   // .insertRule?


// };




// // This is purely for education
// function change(anim) {
//   // Obtains the animation object of the specified
//   // animation
//   var keyframes = findKeyframesRule(anim),
//       length = keyframes.cssRules.length;
  
//   // Makes an array of the current percent values
//   // in the animation
//   var keyframeString = [];  
//   for(var i = 0; i < length; i ++)
//   {
//     keyframeString.push(keyframes[i].keyText);
//   }
  
    
//   // Removes all the % values from the array so
//   // the getClosest function can perform calculations
//   var keys = keyframeString.map(function(str) {
//     return str.replace('%', '');
//   });
  
//   // Updates the current position of the circle to
//   // be used in the calculations
//   totalCurrentPercent += currentPercent;
//   if(totalCurrentPercent > 100)
//   {
//     totalCurrentPercent -= 100;
//   }
//   // Self explanatory variables if you read the
//   // description of getClosest
//   var closest = getClosest(keys);
  
//   var position = keys.indexOf(closest), 
//       firstPercent = keys[position];
  
//   // Removes the current rules of the specified 
//   // animation
//   for(var i = 0, j = keyframeString.length; i < j; i ++)
//   {
//     keyframes.deleteRule(keyframeString[i]);
//   }
  
//   // Turns the percent when activated into the
//   // corresponding degree of a circle
//   var multiplier = firstPercent * 3.6;
  
//   // Essentially this creates the rules to set a new 
//   // origin for the path based on the approximated
//   // percent of the animation when activated and
//   // increases the diameter of the new circular path  
//   keyframes.insertRule("0% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 0) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 0) + "deg); background-color:red; }");
//   keyframes.insertRule("13% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 45) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 45) + "deg); }");
//   keyframes.insertRule("25% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 90) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 90) + "deg); }");



// // @-webkit-keyframes x-spin {
// //   0%    { -webkit-transform: rotateX(0deg); }
// //   100%  { -webkit-transform: rotateX(1000deg); }
// // }
// // @-webkit-keyframes x-spin-fast {
// //   0%    { -webkit-transform: rotateX(0deg); }
// //   100%  { -webkit-transform: rotateX(3600deg); }
// // }
// // @-webkit-keyframes back-x-spin {
// //   0%    { -webkit-transform: rotateX(1800deg); }
// //   100%  { -webkit-transform: rotateX(0deg); }
// // }
// };




