Maildog.Views.MainFolders = Backbone.CompositeView.extend({
  template: JST['mainFolders'],
  tagName: "li",

  events: {
    "click .compose-button": "popUpComposeEmailBox",
    "click #inbox-folder": "routeToInbox",
    "click #starred-folder": "routeToStarred",
    "click #sent-folder": "routeToSent",
    "click #drafts-folder": "routeToDrafts",
    "click #trash-folder": "routeToTrash",
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  routeToInbox: function() {
    if (Backbone.history.getFragment() === "inbox") {
      Backbone.history.loadUrl("#inbox");
    }
    else {
      Backbone.history.navigate("inbox", { trigger: true });
    }
  },

  routeToStarred: function() {
    if (Backbone.history.getFragment() === "starred") {
      Backbone.history.loadUrl("#starred");
    }
    else {
      Backbone.history.navigate("starred", { trigger: true });
    }
  },

  routeToSent: function() {
    if (Backbone.history.getFragment() === "sent") {
      Backbone.history.loadUrl("#sent");
    }
    else {
      Backbone.history.navigate("sent", { trigger: true });
    }
  },

  routeToDrafts: function() {
    if (Backbone.history.getFragment() === "drafts") {
      Backbone.history.loadUrl("#drafts");
    }
    else {
      Backbone.history.navigate("drafts", { trigger: true });
    }
  },

  routeToTrash: function() {
    if (Backbone.history.getFragment() === "trash") {
      Backbone.history.loadUrl("#trash");
    }
    else {
      Backbone.history.navigate("trash", { trigger: true });
    }
  },

  popUpComposeEmailBox: function() {
    if (this.subviews('.compose-email-popup-container').values().length === 2) {
      Maildog.router.addFlash('Please close one of the windows and try again', 5000);
      return;
    }
    
    Maildog.router.removeFlashes();
    var view = new Maildog.Views.ComposeEmailBox();
    this.addSubview('.compose-email-popup-container', view, true);
    $('.compose-email-popup-to').focus();
  }
});
