Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "inbox",
    "inbox": "inbox",
    "sent": "sent",
    "drafts": "drafts",
    "emails/:id": "showEmailThread"
  },

  inbox: function() {
    Backbone.pubSub.off();
    this.removeFlashes();

    this.trigger("folderNavigation", "inbox");
    var view = new Maildog.Views.EmailList({
      collection: Maildog.inboxEmails,
      folder: "inbox"
    });
    this._swapView(view);
  },

  sent: function() {
    Backbone.pubSub.off();
    this.removeFlashes();

    var sentEmails = new Maildog.Collections.Emails([], { urlAction: "sent" });
    this.trigger("folderNavigation", "sent");
    var view = new Maildog.Views.EmailList({
      folder: "sent",
      collection: sentEmails
    });
    this._swapView(view);
  },

  drafts: function() {
    Backbone.pubSub.off();
    this.removeFlashes();

    var draftsEmails = new Maildog.Collections.Emails([], { urlAction: "drafts" });
    this.trigger("folderNavigation", "drafts");
    var view = new Maildog.Views.EmailList({
      folder: "drafts",
      collection: draftsEmails
    });
    this._swapView(view);
  },

  showEmailThread: function(id) {
    this.removeFlashes();

    var thread = new Maildog.Collections.EmailThreads([], { id: id });
    this.trigger("showEmailMessageOptions", thread);
    var view = new Maildog.Views.ShowEmailThread({ collection: thread });
    this._swapView(view);
  },

  addFlash: function(message) {
    Maildog.flashMessages.addMessage(message);
  },

  removeFlashes: function() {
    Maildog.flashMessages.removeMessages();
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $(".show-container").html(newView.$el);
    newView.render();
  }
});
