Maildog.Views.EmailOptions = Backbone.View.extend({
  template: JST['emailOptions'],
  id: 'email-options',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
