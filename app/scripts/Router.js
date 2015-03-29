

SlotMachine.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.el = options.el;
  },

  routes: {
    "": "index"
  },
  index: function() {
    var view = new SlotMachine.AppView();
    this.el.empty();    // Remove 'Loading...'
    this.el.append(view.render().el);
  },

  // SlotMachine.boot
  SlotMachine.init = function(container) {
    container = $(container);
    var router = new SlotMachine.Router({el: container});
    Backbone.history.start();
  }
});

