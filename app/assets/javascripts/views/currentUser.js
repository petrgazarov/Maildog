Maildog.Views.CurrentUser = Backbone.CompositeView.extend({
  template: JST['currentUser'],
  id: 'current_user',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
