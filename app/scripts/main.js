// main.js
// $(function() {
var SlotMachine = {
  postersPerReel: 12,
  reelRadius: 200
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
$('#play').on('click', function(){
  if ( !($('#reel-1').hasClass('active')) ) {
    $('#reel-1').addClass('active');
    $('#reel-2').addClass('active');
    $('#reel-3').addClass('active');
    setTimeout(function() {
      $('#reel-1').removeClass('active');
      $('#reel-2').removeClass('active');
      $('#reel-3').removeClass('active');
    }, 9100);
  }
});

SlotMachine.play = function() {
  // create a final poster and its degrees for each reel
    // order: 0 coffee, 1 tea, 2 espresso, 3 coffee, 4 tea, 5 espresso, 6 coffee, 7 tea, 8 espresso, 9 coffee, 10 tea, 11 espresso
  var final1 = Math.ceil(Math.random() * 12);
  var final2 = Math.ceil(Math.random() * 12);
  var final3 = Math.ceil(Math.random() * 12);
  var deg1 = (final1 * 30) + 1080; 
  var deg2 = (final2 * 30) + 1800; 
  var deg3 = (final3 * 30) + 3240; 

  console.log(final1, final2, final3);
  // var degArr = [deg1, deg2, deg3];
  // other arguments???
  SlotMachine.editKeyFramesRules(deg1, 'spin-1');
  SlotMachine.editKeyFramesRules(deg2, 'spin-2');
  SlotMachine.editKeyFramesRules(deg3, 'spin-3');

  // add .active to each reel

  if (final1 % 3 === final2 % 3 && final1 % 3 === final3 % 3) {
    // win
  }


};



// find the desired keyFrames rules in CSS to control outcomes dynamically
  // rules: 'spin-1', 'spin-2', & 'spin-3'
SlotMachine.findKeyframesRule = function (rule) {
    // cross-browser CSS rule object
    if (document.styleSheets[0].cssRules) {
      var rules = document.styleSheets[0].cssRules;
    } else if (document.styleSheets[0].rules) {
      var rules = document.styleSheets[0].rules;
    }
    for (var j = 0; j < rules.length; ++j) {
        if (rules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && rules[j].name == rule) { return rules[j]; 
        }
    }
    return null;
}



// Replaces the animation hard coded specifications
SlotMachine.editKeyFramesRule = function(deg, rule) {
};


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
}

// })();