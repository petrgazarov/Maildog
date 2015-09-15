Maildog.Views.MailIndex = Backbone.CompositeView.extend({
  template: JST['mailIndex'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
