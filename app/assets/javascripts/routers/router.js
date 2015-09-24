Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "inbox",
    "inbox": "inbox",
    "sent": "sent",
    "drafts": "drafts",
    "emails/:id": "emailListItemClick"
  },

  inbox: function() {
    Backbone.pubSub.off();
    this._removeFlashes();

    Maildog.inboxEmails.fetch({ reset: true });
    this.trigger("folderNavigation", "inbox");
    var view = new Maildog.Views.EmailList({
      collection: Maildog.inboxEmails,
      folder: "inbox"
    });
    this._swapView(view);
  },

  sent: function() {
    Backbone.pubSub.off();
    this._removeFlashes();

    var sentEmails = new Maildog.Collections.Emails([], { urlAction: "sent" });
    sentEmails.fetch({ reset: true });
    this.trigger("folderNavigation", "sent");
    var view = new Maildog.Views.EmailList({
      folder: "sent",
      collection: sentEmails
    });
    this._swapView(view);
  },

  drafts: function() {
    Backbone.pubSub.off();
    this._removeFlashes();

    var draftsEmails = new Maildog.Collections.Emails([], { urlAction: "drafts" });
    draftsEmails.fetch({ reset: true });
    this.trigger("folderNavigation", "drafts");
    var view = new Maildog.Views.EmailList({
      folder: "drafts",
      collection: draftsEmails
    });
    this._swapView(view);
  },

  emailListItemClick: function(id) {
    this._removeFlashes();

    var thread = new Maildog.Collections.EmailThreads([], { id: id });
    thread.fetch({
      reset: true,
      success: function() {
        if (thread.length === 1 && thread.at(0).get('draft')) {
          var view = new Maildog.Views.ComposeEmailBox({
            email: thread.at(0)
          });
          Maildog.emailFolders.addSubview('.compose-email-popup-container', view);
          $('.compose-email-to').focus();
          return;
        }
        else {
          this.trigger("showEmailMessageOptions", thread);
          var view = new Maildog.Views.ShowEmailThread({ collection: thread });
          this._swapView(view);
        }
      }.bind(this)
    });
  },

  addFlash: function(message) {
    Maildog.flashMessages.addMessage(message);
  },

  _removeFlashes: function() {
    Maildog.flashMessages.removeMessages();
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $(".show-container").html(newView.$el);
    newView.render();
  }
});
