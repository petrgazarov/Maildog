Maildog.Views.EmailFolders = Backbone.CompositeView.extend({
  template: JST['emailFolders'],
  tagName: "li",

  events: {
    "click .compose-button": "popUpComposeEmailBox",
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  popUpComposeEmailBox: function() {
    var view = new Maildog.Views.ComposeEmailBox();
    this.addSubview('.compose-email-popup-container', view, true);
    $('.compose-email-to').focus();
  }
});
