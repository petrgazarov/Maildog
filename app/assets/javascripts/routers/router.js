Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function() {
    // this.$rootEl = options.$rootEl
  },

  routes: {
    "": "inbox",
    "inbox": "inbox",
    "emails/:id": "showEmailThead"
  },

  inbox: function() {
    var view = new Maildog.Views.EmailList({ collection: Maildog.inboxEmails });
    this._swapView(view);
  },

  showEmailThead: function(id) {
    this.trigger("showEmailMessageOptions", id);
    var email = Maildog.inboxEmails.getOrFetch(id);
    var view = new Maildog.Views.ShowEmailThread({ model: email });
    this._swapView(view);
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el)
  }
});
