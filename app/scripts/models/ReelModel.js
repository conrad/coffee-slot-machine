// ReelModel.js


// App.js - Defines a backbone model class for the whole app.
var ReelModel = Backbone.Model.extend({

  model: PosterModel;

  defaults: {
    postersNum = 12;
    radius = 200;
  },

  // function Slot(el, max, step) {
  initialize: function(initPoster, posters, accel, max) {


    this.speed = 0; //speed of the slot at any point of time
    this.accel = accel; //speed will increase at this rate
    this.interval = 100;
    this.maxSpeed = max; //max speed this slot can have
    // this.spinDuration = duration;

    this.poster = initPoster;
    // posters should be an array of the posters to appear on the reel
    this.coffeePoster = images[0];
    this.teaPoster = images[1];
    this.espressoPoster = images[2];
    // this.si = null; //holds setInterval object for the given slot
    // this.el = el; //dom element of the slot
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

  ... .on('play', start());
  ... .on('stop', stop());
  }


});
