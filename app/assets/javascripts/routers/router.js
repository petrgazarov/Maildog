Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.$flashEl = options.$flashEl;
    this.flashMessages = new Maildog.Views.FlashMessageList();
    this.$flashEl.html(this.flashMessages.render().$el);
  },

  routes: {
    "session/new": "signIn",
    "": "inbox",
    "inbox": "inbox",
    "emails/:id": "showEmailThead"
  },

  signIn: function(callback) {
    if (!this._requireSignedOut(callback)) { return; }
    var signInView = new Maildog.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  inbox: function() {
    var callback = this.inbox.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._removeFlashes();
    Maildog.inboxEmails.fetch();
    this.trigger("folderLinkClick");
    var view = new Maildog.Views.EmailList({ collection: Maildog.inboxEmails });
    this._swapView(view);
  },

  showEmailThead: function(id) {
    var callback = this.inbox.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    this._removeFlashes();
    var thread = new Maildog.Collections.EmailThreads({ id: id });
    thread.fetch();
    this.trigger("showEmailMessageOptions", thread);
    var view = new Maildog.Views.ShowEmailThread({ collection: thread });
    this._swapView(view);
  },

  addFlash: function(message) {
    this.flashMessages.addMessage(message);
  },

  _removeFlashes: function() {
    this.flashMessages.removeMessages();
  },

  _requireSignedIn: function(callback) {
    if (!Maildog.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback) {
    if (Maildog.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});
