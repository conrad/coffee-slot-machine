// main.js
// $(function() {
var SlotMachine = {
  postersPerReel: 12,
  reelRadius: 200,
  win: {}         // organizational objects
};
window.SlotMachine = SlotMachine;


SlotMachine.setup_posters = function(reel, reelNum) {
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
  SlotMachine.setup_posters(document.getElementById('reel-1'), 1);
  SlotMachine.setup_posters(document.getElementById('reel-2'), 2);
  SlotMachine.setup_posters(document.getElementById('reel-3'), 3);
};

// call init once the document is fully loaded
window.addEventListener('load', SlotMachine.init, false);

// start & stop spinning with play button
$('#playTHis').on('click', function(){
  $('#reel-1').toggleClass('active');
  $('#reel-2').toggleClass('active');
  $('#reel-3').toggleClass('active');
  if ( !($('#reel-1').hasClass('active')) ) {
    $('#play').html('Play!').removeClass('btn-danger').addClass('btn-success');
  } else {
    $('#play').html('Play Again?').removeClass('btn-success').addClass('btn-danger');
  }

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
});



SlotMachine.spinReel = function(selector, angle, duration) {
  // $('#reel-2').toggleClass('active');
  // $('#reel-3').toggleClass('active');

  console.log('spinReel called with', selector, angle, duration);
  $(selector).css({
      spin: 'rotateX(' + angle + 'deg)',
      time: duration + 's',
      easing: 'cubic-bezier(0.770, 0.115, 0.420, 1.040)',
      // webkitTransform : 'rotateX(' + angle + 'deg) ' + duration +,
      // WebkitTransition : 'spin time easing',
      // MozTransition    : 'spin time easing',
      // MsTransition     : 'spin time easing',
      // transition       : 'spin time easing',
      // OTransition      : 'spin time easing',

      WebkitTransform: 'rotateX(' + angle + 'deg)',
      transform: 'rotateX(' + angle + 'deg)',
      MozTransform: 'rotateX(' + angle + 'deg)',
      WebkitTransform: 'rotateX(' + angle + 'deg)',
      msTransform: 'rotateX(' + angle + 'deg)',

      WebkitTransition : '1s ease-in-out',
      MozTransition    : '1s ease-in-out',
      MsTransition     : '1s ease-in-out',
      OTransition      : '1s ease-in-out',
      transition       : '1s ease-in-out'
  });



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

};


SlotMachine.play = function() {
  // create a final poster and its degrees for each reel
    // order: 0 coffee, 1 tea, 2 espresso, 3 coffee, 4 tea, 5 espresso, 6 coffee, 7 tea, 8 espresso, 9 coffee, 10 tea, 11 espresso
  var final1 = Math.ceil(Math.random() * 12);
  var final2 = Math.ceil(Math.random() * 12);
  var final3 = Math.ceil(Math.random() * 12);
  console.log(final1, final2, final3);
  var angle1 = (final1 * 30) + 720; 
  var angle2 = (final2 * 30) + 1800; 
  var angle3 = (final3 * 30) + 3240; 

  // Having trouble making this work because there the setter for cssText isn't working properly... need a workaround (CSSOM?)
  // SlotMachine.editReelSpinRule(angle1, 4, '#reel-1.active');
  // SlotMachine.editReelSpinRule(angle2, 7, '#reel-2.active');
  // SlotMachine.editReelSpinRule(angle3, 10, '#reel-3.active');
  SlotMachine.spinReel('#reel-1', angle1, 4);
  SlotMachine.spinReel('#reel-2', angle2, 7);
  SlotMachine.spinReel('#reel-3', angle3, 10);

  if (final1 % 3 === final2 % 3 && final1 % 3 === final3 % 3) {
    // win
    if (final1 % 3 === 0) {
      // coffee
      SlotMachine.win.coffee();
    } else if (final1 % 3 === 1) {
      // tea
      SlotMachine.win.tea();
    } else if (final1 % 3 === 2) {
      // espresso
      SlotMachine.win.espresso();
    }
  }
};


$('#play').on('click', SlotMachine.play);









SlotMachine.getCssRules = function() {
    //  CSS rule object conditional for cross-browser compatibility
    if (document.styleSheets[0].cssRules) {
      return document.styleSheets[0].cssRules;
    } else if (document.styleSheets[0].rules) {
      return document.styleSheets[0].rules;
    }
    return null;
};

// find the desired CSS rules to control outcomes dynamically
  // rules: 'spin-1', 'spin-2', & 'spin-3'
SlotMachine.findCssRule = function (selector) {
  
  var rules = SlotMachine.getCssRules();

  for (var j = 0; j < rules.length; ++j) {
    if (rules[j].selectorText === selector) {
      console.log('Rule found:', rules[j], 'at', j);
      return [rules[j], j];
    }
  }
  console.log('Rule not found');
  return null;
};


// Replaces the animation hard-coded specifications
SlotMachine.editReelSpinRule = function(angle, duration, selector) {
  var ruleInfo = SlotMachine.findCssRule(selector);
  var rule = ruleInfo[0];
  var ruleIndex = ruleInfo[1];
  var length = rule.cssText.length;
  console.log
  rule.cssText = selector, '{ -webkit-transform: rotateX(' + angle + '); -webkit-transition-duration: ' + duration + 's; transition-duration: ' + duration + 's; }';

  // document.styleSheets[0].cssRules[ruleIndex].cssText = rule.cssText;
  // console.log(selector, '{ -webkit-transform: rotateX(' + angle + '); -webkit-transition-duration: ' + duration + 's; transition-duration: ' + duration + 's; }');
  // console.log(rule.cssText);
  var ruleText = [];  
  for(var i = 0; i < length; i ++)
  {
    keyframeString.push(keyframes[i].keyText); 
  }
    

  // delete original rule
  for (var i = 0, j = ruleText.length; i < j; i ++) {
    rule.deleteRule(ruleText[i]);
  }


  console.log('editReelSpinRule called on', selector);
  console.log('The Current Value of the Rule:',document.styleSheets[0].cssRules[ruleIndex].cssText);

  // .deleteRule?
  // .insertRule?


};




// This is purely for education
function change(anim) {
  // Obtains the animation object of the specified
  // animation
  var keyframes = findKeyframesRule(anim),
      length = keyframes.cssRules.length;
  
  // Makes an array of the current percent values
  // in the animation
  var keyframeString = [];  
  for(var i = 0; i < length; i ++)
  {
    keyframeString.push(keyframes[i].keyText);
  }
  
    
  // Removes all the % values from the array so
  // the getClosest function can perform calculations
  var keys = keyframeString.map(function(str) {
    return str.replace('%', '');
  });
  
  // Updates the current position of the circle to
  // be used in the calculations
  totalCurrentPercent += currentPercent;
  if(totalCurrentPercent > 100)
  {
    totalCurrentPercent -= 100;
  }
  // Self explanatory variables if you read the
  // description of getClosest
  var closest = getClosest(keys);
  
  var position = keys.indexOf(closest), 
      firstPercent = keys[position];
  
  // Removes the current rules of the specified 
  // animation
  for(var i = 0, j = keyframeString.length; i < j; i ++)
  {
    keyframes.deleteRule(keyframeString[i]);
  }
  
  // Turns the percent when activated into the
  // corresponding degree of a circle
  var multiplier = firstPercent * 3.6;
  
  // Essentially this creates the rules to set a new 
  // origin for the path based on the approximated
  // percent of the animation when activated and
  // increases the diameter of the new circular path  
  keyframes.insertRule("0% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 0) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 0) + "deg); background-color:red; }");
  keyframes.insertRule("13% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 45) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 45) + "deg); }");
  keyframes.insertRule("25% { -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 90) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 90) + "deg); }");



// @-webkit-keyframes x-spin {
//   0%    { -webkit-transform: rotateX(0deg); }
//   100%  { -webkit-transform: rotateX(1000deg); }
// }
// @-webkit-keyframes x-spin-fast {
//   0%    { -webkit-transform: rotateX(0deg); }
//   100%  { -webkit-transform: rotateX(3600deg); }
// }
// @-webkit-keyframes back-x-spin {
//   0%    { -webkit-transform: rotateX(1800deg); }
//   100%  { -webkit-transform: rotateX(0deg); }
// }
};







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
};

SlotMachine.win.tea = function() {
  // put some good stuff in here. jQuery, gifs, 
  console.log('Win Tea!');
  
};

SlotMachine.win.espresso = function() {
  // put some good stuff in here. jQuery, gifs, 
  console.log('Win Espresso!');
};


// })();