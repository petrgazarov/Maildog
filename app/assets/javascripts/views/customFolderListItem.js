Maildog.Views.CustomFolderListItem = Backbone.View.extend({
  template: JST['customFolderListItem'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
