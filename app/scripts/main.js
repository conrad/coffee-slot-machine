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