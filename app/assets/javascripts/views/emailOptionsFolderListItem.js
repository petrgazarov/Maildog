Maildog.Views.EmailOptionsFolderListItem = Backbone.View.extend({
  template: JST['emailOptionsFolderListItem'],
  tagName: "li",

  render: function() {
    var content = this.template({ folder: this.model });
    this.$el.html(content);
    return this;
  }
});
