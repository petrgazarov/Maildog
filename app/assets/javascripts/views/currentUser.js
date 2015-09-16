Maildog.Views.CurrentUser = Backbone.CompositeView.extend({
  template: JST['currentUser'],
  className: 'current-user-info',

  initialize: function() {
    this.listenTo(Maildog.currentUser, "sync", this.render)
  },

  render: function() {
    this.$el.html(this.template({ currentUser: Maildog.currentUser }));
    return this;
  }
});
