Maildog.Views.CurrentUser = Backbone.CompositeView.extend({
  template: JST['currentUser'],
  className: 'current-user-info',

  events: {
    "click #current-user-profile-thumb": "toggleUserProfile"
  },

  initialize: function() {
    this.listenTo(Maildog.currentUser, "sync", this.render)
  },

  render: function() {
    this.$el.html(this.template({ currentUser: Maildog.currentUser }));
    $.rails.refreshCSRFTokens();
    return this;
  },

  toggleUserProfile: function() {
    $('.current-user-profile').toggleClass('invisible')
  }
});
