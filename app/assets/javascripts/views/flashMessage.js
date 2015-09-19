Maildog.Views.FlashMessage = Backbone.View.extend({
  template: JST['flashMessage'],
  tagName: "li",
  className: "flash-message",

  initialize: function(options) {
    this.message = options.message;
  },

  render: function() {
    var content = this.template({ message: this.message })
    this.$el.html(content);
    return this;
  }
});
