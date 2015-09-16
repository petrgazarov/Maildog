Maildog.Views.CurrentUser = Backbone.CompositeView.extend({
  template: JST['currentUser'],
  className: 'current-user-info',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
