// ReelView.js

var ReelView = Backbone.View.extend({

  place_posters: function (reel) {
    var posterAngle = 360 / POSTERS_PER_REEL;
    for (var i = 0; i < POSTERS_PER_REEL; i ++) {
      
      // use posterview here
      var poster = document.createElement('div');
      poster.className = 'poster';



      // compute and assign the transform for this poster
      var transform = 'rotateX(' + (posterAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
      poster.style.webkitTransform = transform;

      // setup the number to show inside the poster
      var content = poster.appendChild(document.createElement('p'));
      content.textContent = i;
      // add the poster to the row
      reel.appendChild(poster);
    }

  }