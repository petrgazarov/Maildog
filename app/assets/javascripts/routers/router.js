Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "inbox",
    "inbox": "inbox",
    "emails/:id": "showEmailThead"
  },

  inbox: function() {
    Maildog.inboxEmails.fetch();
    this.trigger("folderLinkClick");
    var view = new Maildog.Views.EmailList({ collection: Maildog.inboxEmails });
    this._swapView(view);
  },

  showEmailThead: function(id) {
    var thread = new Maildog.Collections.EmailThreads({ id: id });
    thread.fetch();
    this.trigger("showEmailMessageOptions", thread);
    var view = new Maildog.Views.ShowEmailThread({ collection: thread });
    this._swapView(view);
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el)
  }
});
