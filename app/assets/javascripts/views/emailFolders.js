Maildog.Views.EmailFolders = Backbone.CompositeView.extend({
  template: JST['emailFolders'],
  className: 'email-folders',

  events: {
    "click .compose-button": "popUpComposeEmailBox"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  popUpComposeEmailBox: function() {
    var view = new Maildog.Views.ComposeEmailBox();
    this.$el.append(view.render().$el)
  }
});
