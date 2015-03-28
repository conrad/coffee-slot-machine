SlotMachine.AppView = Backbone.View.extend({
  template: template('index'),
  initialize: function() {
    this.reels = new SlotMachine.Reels();   // instantiates a collection of reels
    this.reels.on('all', this.render, this);
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
