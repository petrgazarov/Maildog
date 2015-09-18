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
    Maildog.currentUser.fetch();

    Maildog.router = new Maildog.Routers.Router();
    Maildog.mailIndex = new Maildog.Views.MailIndex();
    $("#mail-index").html(Maildog.mailIndex.render().$el);
    Maildog.router.$rootEl = $('.email-show-container');
    Backbone.history.start();
  }
};

$(function() {
  Maildog.initialize();
})
