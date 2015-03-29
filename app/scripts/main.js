// main.js
// $(function() {
var SlotMachine = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};
window.SlotMachine = SlotMachine;

var template = function(name) {
  // return Handlebars.compile($('#'+name+'-template').html());     
      // This isn't working; compile method needs a string arg; might need to have something inside the element in order 
  // $('#'+name+'-template').html('This is where the good stuff goes... should be modular');
  // console.log($('#'+name+'-template') );
  return 'This is where the good stuff goes... should be modular. $....html() should return contents of element. Need some contents for it to work with Handlebars';
};

SlotMachine.Models.Poster = Backbone.Model.extend({});
SlotMachine.Models.App = Backbone.Model.extend({});
SlotMachine.Collections.Reel = Backbone.Collection.extend({});
SlotMachine.Collections.Reels = Backbone.Collection.extend({

});


SlotMachine.Views.Poster = Backbone.View.extend({});
SlotMachine.Views.Reel = Backbone.View.extend({});
SlotMachine.Views.Reels = Backbone.View.extend({});

SlotMachine.Views.App = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#app-template').html()),
  // template: _.template('<div id="reels"><% reels %></div>'),
  // template: template('app'),
  events: {
    "click #play"     : "play",
    "click #stop"     : "stop",
    "click #coffee"   : "coffeeWin",
    "click #tea"      : "teaWin",
    "click #espresso" : "espressoWin",
    "keypress"        : "spacePlayStop"
  },

  initialize: function() {
    this.reels = new SlotMachine.Collections.Reels();
    // this.reels = new SlotMachine.Views.Reels();
    this.reels.on('all', this.render, this);
  },
  render: function() {
    // console.log( this.$el.html(this.template) );
    // this.$el.html(this.template(this));
    this.$el.html( this.template({ reels: this.reels}) );   //.render()
    return this;
  },
  // Toggle play state 
  play: function() {
    // this.$el.addClass("spinning");
    this.model.spin();    // need method in Reel model/collection
  },
  stop: function() {
    // this.$el.addClass("spinning");
    this.model.stop();    // need method in Reel model/collection
  },
  coffeeWin: function() {
    this.model.coffeeWin();    // need method in Reel model/collection
  },
  teaWin: function() {
    this.model.teaWin();    // need method in Reel model/collection
  },
  espressoWin: function() {
    this.model.espressoWin();    // need method in Reel model/collection
  },
  // Be able to start and stop using the spacebar
  spacePlayStop: function(e) {
    if (e.keyCode === 32) 
      if (this.model.state === 'play') {
        this.model.stop();
      } else if (this.model.state === 'stop') {
        this.model.play();
      }
  },



});

SlotMachine.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.el = options.el;
  }, 
  routes: {
    "": "index"    // root - not using push state, so just like empty # 
  },
  index: function() {
    var view = new SlotMachine.Views.App();
    this.el.empty();
    this.el.append(view.render().el);   // add view rendering to element
  }
});

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