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
    var view = new Maildog.Views.MailIndex();
    $("#mail-index").html(view.render().$el);
  }
};

$(function() {
  Maildog.initialize();
})
