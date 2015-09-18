window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Maildog.currentUser = new Maildog.Models.CurrentUser();
    Maildog.inboxEmails = new Maildog.Collections.Emails(
      [], { urlAction: "inbox" });
    Maildog.inboxEmails.fetch();

    var view = new Maildog.Views.MailIndex();
    $("#mail-index").html(view.render().$el);
    new Maildog.Routers.Router({ $rootEl: $('.email-show-container') });
    Backbone.history.start();
  }
};

$(function() {
  Maildog.initialize();
})
