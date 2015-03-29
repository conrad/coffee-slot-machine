 // global SlotMachine, $ 


window.SlotMachine = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    init: function () {
      'use strict';
      console.log('Hello from Backbone!');

      this.Views.App();

      // This should go into AppView / ReelsView
      // place_posters(document.getElementById('reel-1'));
      // place_posters(document.getElementById('reel-2'));
      // place_posters(document.getElementById('reel-3'));

    }
};


$(document).ready(function () {
    'use strict';
    SlotMachine.init();
});
  // call init once the document is fully loaded
  // window.addEventListener('load', init, false);



// MODELS
SlotMachine.Models.Poster = Backbone.Model.extend({
  initialize: function(attributes, options) {
    this.imageSet = params[0];
    this.image = params[1];
  }

});



// COLLECTIONS
SlotMachine.Collections.Reel = Backbone.Collection.extend({

    model: SlotMachine.Models.Poster,

    defaults: {
      postersNum: 12,
      radius: 200
    },

    // function Slot(el, max, step) {
    initialize: function(initPoster, posters, accel, max) {




      // this.speed = 0; //speed of the slot at any point of time
      // this.accel = accel; //speed will increase at this rate
      // this.interval = 100;
      // this.maxSpeed = max; //max speed this slot can have
      // // this.spinDuration = duration;

      // this.poster = initPoster;
      // // posters should be an array of the posters to appear on the reel
      // this.coffeePoster = images[0];
      // this.teaPoster = images[1];
      // this.espressoPoster = images[2];
      // // this.si = null; //holds setInterval object for the given slot
      // // this.el = el; //dom element of the slot
    },


    start: function() {
      // var reps = this.get('duration') / this.get('interval');
      while (this.get('speed') < this.get('maxSpeed')) {
        var next = this.get('speed') + this.get('accel');
        this.set('speed', next);
      }
      this.trigger('maxSpeed', this);
      console.log('Machine max speed reached. Stop when you feel lucky!');
    },

    stop: function() {
      while (this.get('speed') > 0) {
        var next = this.get('speed') - 100;
        this.set('speed', next);
      }
      this.set('speed', 0);
      this.trigger('stopped', this);
      console.log(this + 'stopped');
    }

    // ... .on('play', start());
    // ... .on('stop', stop());
    // }

  });

SlotMachine.Collections.Reels = Backbone.Collection.extend({

  initialize: function() {
    var reel1 = new SlotMachine.Collections.Reel({
      // paths from index.html
      coffee: './assets/reel1/coffee-maker2.png',
      tea: './assets/reel1/teapot-persian.png',
      espresso: './assets/reel1/espresso-machine.png',
      // initPoster:
      // accel: 
      // max: 
    });
    var reel2 = new SlotMachine.Collections.Reel({
      // paths from index.html
      coffee: './assets/reel2/coffee-filter-papers.png',
      tea: './assets/reel2/tea-infuser-2.png',
      espresso: './assets/reel2/espresso-tamper.png'
    });
    var reel3 = new SlotMachine.Collections.Reel({
      // paths from index.html
      coffee: './assets/reel3/coffee-grounds.jpg',
      tea: './assets/reel3/loose-tea.png',
      espresso: './assets/reel3/espresso-ground-coffee-8-oz.png'
    });

  }

})








 // VIEWS

SlotMachine.Views.App = Backbone.View.extend({
   // template: template('index'),

   initialize: function() {
     this.reels = new SlotMachine.Reels();   // instantiates a collection of reels
     this.reels.on('all', this.render, this);
   },

   events: {
     'click #play': function() {
       this.model.dequeue();
     }
   },


   render: function() {
     this.$el.html(this.template(this));
     return this;
   },
   play: function() {
     this.trigger('play')
   },
   stop: function() {
     this.trigger('stop')
   }

 });



SlotMachine.Views.Reel = Backbone.View.extend({
  tagName: 
  template: 
  initialize: function(attributes, options) {
    this.place_posters(document.getElementById('ring-1'));
  },

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
     // add the poster to the reel
     reel.appendChild(poster);
    }

  }
});


  // These will be inserted using the "subview" pattern.
SlotMachine.Views.Poster = Backbone.View.extend({
  tagName: 'div',

  template: _.template('<div class="poster"><img src=<%= posterImage %> </div>'),

  initialize: function(attributes, options) {
    // this.collection.on('add remove', this.render, this);
    posterImage: options.image,
    this.render();
  },



  render: function(){
    return this.$el.html(this.template(this.model.attributes));
    // this.$el.html(this.template(this))
  }
  });




// LOCAL DATA STORAGE
// new Store?
// SlotMachine.Data = {
//   reel1: [],
//   reel2: [],
//   reel3: []
//   var reel1 = new SlotMachine.Collections.Reel({
//     // paths from index.html
//     coffee: './assets/reel1/coffee-maker2.png',
//     tea: './assets/reel1/teapot-persian.png',
//     espresso: './assets/reel1/espresso-machine.png'
//   });
//   var reel2 = new SlotMachine.Collections.Reel({
//     // paths from index.html
//     coffee: './assets/reel2/coffee-filter-papers.png',
//     tea: './assets/reel2/tea-infuser-2.png',
//     espresso: './assets/reel2/espresso-tamper.png'
//   });
//   var reel3 = new SlotMachine.Collections.Reel({
//     // paths from index.html
//     coffee: './assets/reel3/coffee-grounds.jpg',
//     tea: './assets/reel3/loose-tea.png',
//     espresso: './assets/reel3/espresso-ground-coffee-8-oz.png'
//   });
// };



// SlotMachine.Router = Backbone.Router.extend({
//   initialize: function(options) {
//     this.el = options.el;
//   },

//   routes: {
//     "": "index"
//   },
//   index: function() {
//     var view = new SlotMachine.AppView();
//     this.el.empty();    // Remove 'Loading...'
//     this.el.append(view.render().el);
//   },

//   // SlotMachine.boot
//   SlotMachine.init = function(container) {
//     container = $(container);
//     var router = new SlotMachine.Router({el: container});
//     Backbone.history.start();
//   }
// });



