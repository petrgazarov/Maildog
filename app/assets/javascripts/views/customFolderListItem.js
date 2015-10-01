Maildog.Views.CustomFolderListItem = Backbone.View.extend({
  template: JST['customFolderListItem'],
  tagName: "li",

  events: {
    "click #delete-folder-cross": "deleteFolder",
    "click": "loadFolder"
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
  },

  loadFolder: function() {
    Backbone.history.navigate("folders/" + this.model.id, { trigger: true });
  }
});
