Maildog.Views.FlashMessage = Backbone.View.extend({
  template: JST['flashMessage'],

  initialize: function(options) {
    this.message = options.message;
  },

  render: function() {
    this.$el.html(this.template({ message: this.message }));
    return this;
  }
});
