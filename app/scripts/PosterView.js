// PosterView.js

// These will be inserted using the "subview" pattern.
var PosterView = Backbone.View.extend({

  tagName: 'div',
  posterImage: params,

  template: _.template('<div class="poster"><img src=<%= posterImage %> </div>'),


  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});

// compute and assign the transform for this poster
var transform = 'rotateX(' + (posterAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
poster.style.webkitTransform = transform;
