Maildog.Views.EmailShow = Backbone.CompositeView.extend({
  template: JST['emailShow'],
  tagName: "ul",
  className: "email-show-item group",

  events: {
    "click .star": "starClick"
  },

  render: function() {
    var content = this.template({ email: this.model });
    this.$el.html(content);
    return this;
  },

  starClick: function(e) {
    e.preventDefault();

    $(e.currentTarget).toggleClass('star-on');
    if (this.model.get('starred')) {
      this.model.set('starred', false)
    } else {
      this.model.set('starred', true)
    }

    this.model.save({}, {
      error: function() {
        alert('error')
      }
    })
  }
});
