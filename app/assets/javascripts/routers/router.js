Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "inbox": "inbox",
    "emails/:id": "showEmailThead"
  },

  inbox: function() {
    var emails = new Maildog.Collections.InboxEmails();
    var view = new Maildog.Views.EmailList({ collection: emails });
    this._swapView(view);
  },

  showEmailThead: function(id) {
    var emailThread
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el)
  }
});
