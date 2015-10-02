Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "inbox",
    "inbox": "inbox",
    "sent": "sent",
    "drafts": "drafts",
    "starred": "starred",
    "emails/:id": "showEmailThread",
    "search/:query": "search",
    "labels/:id": "labels"
  },

  inbox: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "inbox");
    var view = new Maildog.Views.EmailList({
      collection: Maildog.inboxEmails,
      folder: "inbox"
    });
    this._swapView(view);
  },

  sent: function() {
    this._setUpSwap();

    var sentEmails = new Maildog.Collections.Emails([], { urlAction: "sent" });
    this.trigger("folderNavigation", "sent");
    var view = new Maildog.Views.EmailList({
      folder: "sent",
      collection: sentEmails
    });
    this._swapView(view);
  },

  drafts: function() {
    this._setUpSwap();

    var draftsEmails = new Maildog.Collections.Emails([], { urlAction: "drafts" });
    this.trigger("folderNavigation", "drafts");
    var view = new Maildog.Views.EmailList({
      folder: "drafts",
      collection: draftsEmails
    });
    this._swapView(view);
  },

  starred: function() {
    this._setUpSwap();

    var starredEmails = new Maildog.Collections.Emails([], { urlAction: "starred" });
    this.trigger("folderNavigation", "starred");
    var view = new Maildog.Views.EmailList({
      folder: "starred",
      collection: starredEmails
    });
    this._swapView(view);
  },

  showEmailThread: function(id) {
    Backbone.pubSub.off();
    this.removeFlashes();

    var thread = new Maildog.Collections.EmailThreads([], { id: id });
    this.trigger("showEmailMessageOptions", thread);
    var view = new Maildog.Views.ShowEmailThread({ collection: thread });
    this._swapView(view);
  },

  search: function(query) {
    Backbone.pubSub.off();
    this.removeFlashes();

    var searchResults = new Maildog.Collections.SearchResults();
    searchResults.query = query;
    var view = new Maildog.Views.EmailList({ collection: searchResults });
    this._swapView(view);
  },

  labels: function(id) {
    this._setUpSwap();

    var folder = new Maildog.Models.Label({ id: id });
    this.trigger("folderNavigation", "labels/" + id);

    var labelEmails = new Maildog.Collections.Emails([], {
      url: "api/labels/" + id +"/emails"
    });
    var view = new Maildog.Views.EmailList({
      label: "folders",
      collection: labelEmails
    });
    this._swapView(view);
  },

  addFlash: function(message) {
    this.removeFlashes();

    Maildog.fleshView = new Maildog.Views.FlashMessage({ message: message });
    var $message = $('<div>').addClass('flash-message');
    $message.html(Maildog.fleshView.render().$el);

    $('.flash-container').html($message);
  },

  removeFlashes: function() {
    Maildog.fleshView && Maildog.fleshView.remove();
    $('.flash-container').empty();
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $(".show-container").html(newView.$el);
    newView.render();
  },

  _setUpSwap: function() {
    this.removeFlashes();
    Backbone.pubSub.off();
    this.trigger("clearSearchBox");
  }
});
