window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Maildog.emails = new Maildog.Collections.Emails();
    Maildog.currentUser = new Maildog.Models.CurrentUser();
    new Maildog.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

$(function() {
  Maildog.initialize();
})
