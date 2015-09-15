Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend({
  template: JST['composeEmailBox'],
  tagName: 'form',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
