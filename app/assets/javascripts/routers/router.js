Maildog.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.initializeForSignedIn();
  },

  routes: {
    "session/new": "signIn",
    "": "inbox",
    "inbox": "inbox",
    "sent": "sent",
    "emails/:id": "showEmailThread"
  },

  initializeForSignedIn: function() {
    if (!Maildog.currentUser.isSignedIn()) { return; }

    this._currentView && this._currentView.remove();
    this.flashMessages = new Maildog.Views.FlashMessageList();
    $('.flash-container').html(this.flashMessages.render().$el);
    this.mailNav = Maildog.Views.mailNav = new Maildog.Views.MailNav();
    $("#mail-nav").html(this.mailNav.render().$el);
    this.mailSidebar = new Maildog.Views.MailSidebar();
    $("#mail-sidebar").html(this.mailSidebar.render().$el);
  },

  signIn: function(callback) {
    if (!this._requireSignedOut(callback)) { return; }

    Maildog.signInView = new Maildog.Views.SignIn({
      callback: callback
    });
    this._swapView(Maildog.signInView);
  },

  inbox: function() {
    Backbone.pubSub.off();
    var callback = this.inbox.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._removeFlashes();
    Maildog.inboxEmails.fetch({ reset: true });
    this.trigger("folderLinkClick", "inbox");
    var view = new Maildog.Views.EmailList({
      collection: Maildog.inboxEmails,
      folder: "inbox"
    });
    this._swapView(view);
  },

  sent: function() {
    Backbone.pubSub.off();
    var callback = this.sent.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._removeFlashes();
    var sentEmails = new Maildog.Collections.Emails([], { urlAction: "sent" });
    sentEmails.fetch({ reset: true });
    this.trigger("folderLinkClick", "sent");
    var view = new Maildog.Views.EmailList({
      folder: "sent",
      collection: sentEmails
    });
    this._swapView(view);
  },

  showEmailThread: function(id) {
    var callback = this.showEmailThread.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    this._removeFlashes();
    var thread = new Maildog.Collections.EmailThreads([], { id: id });
    thread.fetch({ reset: true });
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
    $(".show-container").html(newView.$el);
    newView.render();
  }
});
