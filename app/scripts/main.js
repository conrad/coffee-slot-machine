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
    // setup the number to show inside the poster
    var content = poster.appendChild(document.createElement('p'));
    content.textContent = i;
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


SlotMachine.images = {
  reel1: [
    './assets/reel1/coffee-maker2.png',
    './assets/reel1/teapot-persian.png',
    './assets/reel1/espresso-machine.png',
  ],
  reel2: [
    './assets/reel2/coffee-filter-papers.png',
    './assets/reel2/tea-infuser-2.png',
    './assets/reel2/espresso-tamper.png'
  ],
  reel3: [
    './assets/reel3/coffee-grounds.jpg',
    './assets/reel3/loose-tea.png',
    './assets/reel3/espresso-ground-coffee-8-oz.png'
  ]
};

SlotMachine.boot = function(container) {
  container = $(container);   // wrap in jQuery
  // router won't be used for much here, but now it can instantiate views on the container
  var router = new SlotMachine.Router({el: container}); 
  // causes Backbone to read routes
  Backbone.history.start();
};
// })();