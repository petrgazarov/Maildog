Maildog.Views.EmailFolders = Backbone.CompositeView.extend({
  template: JST['emailFolders'],
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
    Backbone.history.loadUrl("#inbox");
  },

  routeToStarred: function() {
    Backbone.history.loadUrl("#starred");
  },

  routeToSent: function() {
    Backbone.history.loadUrl("#sent");
  },

  routeToDrafts: function() {
    Backbone.history.loadUrl("#drafts");
  },

  routeToTrash: function() {
    Backbone.history.loadUrl("#trash");
  },

  popUpComposeEmailBox: function() {
    var view = new Maildog.Views.ComposeEmailBox();
    this.addSubview('.compose-email-popup-container', view, true);
    $('.compose-email-to').focus();
  }
});
