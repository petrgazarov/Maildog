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
    Maildog.currentUser.fetch();
    Backbone.pubSub = _.extend({}, Backbone.Events);

    Maildog.inbox = new Maildog.Collections.EmailThreads(
      [], { urlAction: "inbox" }
    );
    Maildog.starred = new Maildog.Collections.EmailThreads(
      [], { urlAction: "starred" }
    );
    Maildog.sent = new Maildog.Collections.EmailThreads(
      [], { urlAction: "sent" }
    );
    Maildog.drafts = new Maildog.Collections.EmailThreads(
      [], { urlAction: "drafts" }
    );
    Maildog.trash = new Maildog.Collections.EmailThreads(
      [], { urlAction: "trash" }
    );

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
