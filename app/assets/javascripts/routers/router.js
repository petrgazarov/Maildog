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

    var view = new Maildog.Views.EmailList({
      collection: Maildog.inbox,
      folder: "inbox"
    });
    this._swapView(view);
  },

  sent: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "sent");
    var view = new Maildog.Views.EmailList({
      folder: "sent",
      collection: Maildog.sent
    });
    this._swapView(view);
  },

  drafts: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "drafts");
    var view = new Maildog.Views.EmailList({
      folder: "drafts",
      collection: Maildog.drafts
    });
    this._swapView(view);
  },

  starred: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "starred");
    var view = new Maildog.Views.EmailList({
      folder: "starred",
      collection: Maildog.starred
    });
    this._swapView(view);
  },

  showEmailThread: function(id) {
    Backbone.pubSub.off();
    this.removeFlashes();
    var trash = (
      Backbone.history.getFragment().indexOf('trash') === -1 ? false : true
    );

    var thread = new Maildog.Models.EmailThread({ id: id });
    this.trigger("showEmailMessageOptions");
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

    var searchResults = new Maildog.Collections.SearchResults();
    searchResults.query = query;
    var view = new Maildog.Views.EmailList({ collection: searchResults });
    this._swapView(view);
  },

  labels: function(id) {
    this._setUpSwap();

    var label = new Maildog.Models.Label({ id: id });
    this.trigger("folderNavigation", "labels/" + id);

    var labelThreads = new Maildog.Collections.EmailThreads([], {
      url: "api/labels/" + id +"/threads"
    });
    var view = new Maildog.Views.EmailList({
      folder: "labels",
      collection: labelThreads
    });
    this._swapView(view);
  },

  trash: function() {
    this._setUpSwap();

    this.trigger("folderNavigation", "trash");
    var view = new Maildog.Views.EmailList({
      folder: "trash",
      collection: Maildog.trash
    });
    this._swapView(view);
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
