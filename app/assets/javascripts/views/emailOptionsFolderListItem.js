Maildog.Views.EmailOptionsFolderListItem = Backbone.View.extend({
  template: JST['emailOptionsFolderListItem'],
  tagName: "li",

  events: {
    "click": "moveToFolder"
  },

  render: function() {
    var content = this.template({ folder: this.model });
    this.$el.html(content);
    return this;
  },

  moveToFolder: function() {
    // Backbone.history.navigate("folders/" + this.model.id, { trigger: true });
  }
});
