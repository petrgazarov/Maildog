window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Maildog.currentUser = new Maildog.Models.CurrentUser();
    Maildog.inboxEmails = new Maildog.Collections.Emails(
      [], { urlAction: "inbox" });
    Maildog.currentUser.fetch();
    Backbone.pubSub = _.extend({}, Backbone.Events);

    Maildog.router = new Maildog.Routers.Router({
      $rootEl: $('.email-show-container'),
      $flashEl: $('.flash-container')
    });

    Maildog.Views.mailNav = new Maildog.Views.MailNav();
    $("#mail-nav").html(Maildog.Views.mailNav.render().$el);

    Maildog.Views.mailSidebar = new Maildog.Views.MailSidebar();
    $("#mail-sidebar").html(Maildog.Views.mailSidebar.render().$el);
    Backbone.history.start();
  }
};

$(function() {
  Maildog.initialize();
})
