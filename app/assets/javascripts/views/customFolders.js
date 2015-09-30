Maildog.Views.CustomFolders = Backbone.CompositeView.extend({
  template: JST['customFolders'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }
})
