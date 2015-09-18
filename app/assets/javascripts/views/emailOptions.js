Maildog.Views.EmailOptions = Backbone.View.extend({
  template: JST['emailOptions'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
