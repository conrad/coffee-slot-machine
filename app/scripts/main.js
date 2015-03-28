 // global SlotMachine, $ 


window.SlotMachine = {
    Models: {
      // ReelModel,
      // PosterModel
    },
    Collections: {
      // Reels
    },
    Views: {
      // AppView,
      // ReelView,
      // PosterView
    },
    Routers: {},

    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        // This should go into AppView / ReelsView
        place_posters(document.getElementById('reel-1'));
        place_posters(document.getElementById('reel-2'));
        place_posters(document.getElementById('reel-3'));

    }
};


$(document).ready(function () {
    'use strict';
    SlotMachine.init();
});
  // call init once the document is fully loaded
  // window.addEventListener('load', init, false);

