Maildog.Views.CustomFolderListItem = Backbone.View.extend({
  template: JST['customFolderListItem'],
  tagName: "li",

  events: {
    "click #delete-folder-cross": "deleteFolder"
  },

  render: function() {
    var content = this.template({ folder: this.model });
    this.$el.html(content);
    return this;
  },

  deleteFolder: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.remove();
  }
});
