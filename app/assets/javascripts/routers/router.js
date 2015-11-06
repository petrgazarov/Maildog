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
    "threads/:id": "showEmailThread",
    "threads/:id/trash": "showEmailThread",
    "search/:query": "search",
    "labels/:id": "labels",
    "trash": "trash"
  },

  inbox: function() {
    this._setUpSwap();
    this.trigger("folderNavigation", "inbox");

    Maildog.currentThreadList = new Maildog.Views.EmailList({
      collection: Maildog.inbox,
      folder: "inbox"
    });
    this._swapView(Maildog.currentThreadList);
  },

  sent: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "sent");
    Maildog.currentThreadList = new Maildog.Views.EmailList({
      folder: "sent",
      collection: Maildog.sent
    });
    this._swapView(Maildog.currentThreadList);
  },

  drafts: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "drafts");
    Maildog.currentThreadList = new Maildog.Views.EmailList({
      folder: "drafts",
      collection: Maildog.drafts
    });
    this._swapView(Maildog.currentThreadList);
  },

  starred: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "starred");
    Maildog.currentThreadList = new Maildog.Views.EmailList({
      folder: "starred",
      collection: Maildog.starred
    });
    this._swapView(Maildog.currentThreadList);
  },

  showEmailThread: function(id) {
    Backbone.pubSub.off();
    this.removeFlashes();

    var trash = (
      Backbone.history.getFragment().indexOf('trash') === -1 ? false : true
    );

    var thread = new Maildog.Models.EmailThread({ id: id });
    this.trigger("showEmailMessageOptions", trash);
    var view = new Maildog.Views.ShowEmailThread({
      model: thread,
      collection: thread.emails(),
      trash: trash
    });
    this._swapView(view);
  },

  search: function(query) {
    Backbone.pubSub.off();
    this.removeFlashes();
    this.trigger("folderNavigation", "search/" + query);

    var searchResults = new Maildog.Collections.SearchResults();
    searchResults.query = query;
    Maildog.currentThreadList = new Maildog.Views.EmailList({
      collection: searchResults,
      folder: "search"
    });
    this._swapView(Maildog.currentThreadList);
  },

  labels: function(id) {
    this._setUpSwap();

    var label = new Maildog.Models.Label({ id: id });
    this.trigger("folderNavigation", "labels/" + id);

    var labelThreads = new Maildog.Collections.EmailThreads([], {
      url: "api/labels/" + id +"/threads"
    });
    Maildog.currentThreadList = new Maildog.Views.EmailList({
      folder: "labels",
      collection: labelThreads
    });
    this._swapView(Maildog.currentThreadList);
  },

  trash: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "trash");
    Maildog.currentThreadList = new Maildog.Views.EmailList({
      folder: "trash",
      collection: Maildog.trash
    });
    this._swapView(Maildog.currentThreadList);
  },

  addFlash: function(message, interval) {
    this.removeFlashes();
    window.clearTimeout(this.flashIntervalId);
    interval = interval || 30000;

    Maildog.fleshView = new Maildog.Views.FlashMessage({ message: message });
    var $message = $('<div>').addClass('flash-message');
    $message.html(Maildog.fleshView.render().$el);

    $('.flash-container').html($message);
    this.flashIntervalId = window.setTimeout(function() {
      this.removeFlashes()
    }.bind(this), interval)
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
