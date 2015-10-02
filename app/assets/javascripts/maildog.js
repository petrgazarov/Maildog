window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    Maildog.currentUser = (
      Maildog.currentUser || new Maildog.Models.CurrentUser()
    );
    Maildog.inboxThreads = new Maildog.Collections.EmailThreads(
      [], { urlAction: "inbox" });
    Maildog.currentUser.fetch();
    Backbone.pubSub = _.extend({}, Backbone.Events);

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
