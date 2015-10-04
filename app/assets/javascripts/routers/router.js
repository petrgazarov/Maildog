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
    "search/:query": "search",
    "labels/:id": "labels",
    "trash": "trash"
  },

  inbox: function() {
    this._setUpSwap();
    this.trigger("folderNavigation", "inbox");

    var inboxThreads = new Maildog.Collections.EmailThreads(
      [], { urlAction: "inbox" }
    );
    var view = new Maildog.Views.EmailList({
      collection: inboxThreads,
      folder: "inbox"
    });
    this._swapView(view);
  },

  sent: function() {
    this._setUpSwap();

    var sentThreads = new Maildog.Collections.EmailThreads(
      [], { urlAction: "sent" }
    );
    this.trigger("folderNavigation", "sent");
    var view = new Maildog.Views.EmailList({
      folder: "sent",
      collection: sentThreads
    });
    this._swapView(view);
  },

  drafts: function() {
    this._setUpSwap();

    var draftsThreads = new Maildog.Collections.EmailThreads(
      [], { urlAction: "drafts" }
    );
    this.trigger("folderNavigation", "drafts");
    var view = new Maildog.Views.EmailList({
      folder: "drafts",
      collection: draftsThreads
    });
    this._swapView(view);
  },

  starred: function() {
    this._setUpSwap();

    var starredEmails = new Maildog.Collections.EmailThreads(
      [], { urlAction: "starred" }
    );
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

    var thread = new Maildog.Models.Thread({ id: id });
    this.trigger("showEmailMessageOptions", thread);
    var view = new Maildog.Views.ShowEmailThread({
      model: thread,
      collection: thread.emails()
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

    var trashEmails = new Maildog.Collections.EmailThreads(
      [], { urlAction: "trash" }
    );
    this.trigger("folderNavigation", "trash");
    var view = new Maildog.Views.EmailList({
      folder: "trash",
      collection: trashEmails
    });
    this._swapView(view);
  },

  addFlash: function(message) {
    this.removeFlashes();

    Maildog.fleshView = new Maildog.Views.FlashMessage({ message: message });
    var $message = $('<div>').addClass('flash-message');
    $message.html(Maildog.fleshView.render().$el);

    $('.flash-container').html($message);
    window.setTimeout(function() {
      this.removeFlashes()
    }.bind(this), 10000)
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
