Maildog.Views.EmailFolders = Backbone.CompositeView.extend({
  template: JST['emailFolders'],
  id: 'email-folders',

  events: {
    "click .compose-button": "popUpComposeEmailBox"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  popUpComposeEmailBox: function() {
    
  }
});
