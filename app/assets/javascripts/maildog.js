window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Maildog.currentUser = new Maildog.Models.CurrentUser();
    Maildog.inboxEmails = new Maildog.Collections.InboxEmails();
    var view = new Maildog.Views.MailIndex();
    $("#mail-index").html(view.render().$el);
    new Maildog.Routers.Router({ $rootEl: $('.email-show-container') });
    Backbone.history.start();
    Backbone.history.navigate("inbox", { trigger: true })
  }
};

$(function() {
  Maildog.initialize();
})
