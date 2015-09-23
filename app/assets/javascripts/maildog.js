window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Maildog.currentUser = (
      Maildog.currentUser || new Maildog.Models.CurrentUser()
    );
    Maildog.inboxEmails = new Maildog.Collections.Emails(
      [], { urlAction: "inbox" });
    Maildog.currentUser.fetch();
    Backbone.pubSub = _.extend({}, Backbone.Events);

    Maildog.flashMessages = new Maildog.Views.FlashMessageList();
    $('.flash-container').html(Maildog.flashMessages.render().$el);

    Maildog.router = new Maildog.Routers.Router({
      $rootEl: $('.main-container')
    });

    var mailNavView = new Maildog.Views.MailNav();
    $("#mail-nav").html(mailNavView.render().$el);
    var mailSidebarView = new Maildog.Views.MailSidebar();
    $("#mail-sidebar").html(mailSidebarView.render().$el);

    Backbone.history.start();
  }
};
