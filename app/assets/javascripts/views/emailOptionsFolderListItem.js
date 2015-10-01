Maildog.Views.EmailOptionsFolderListItem = Backbone.View.extend({
  template: JST['emailOptionsFolderListItem'],
  tagName: "li",

  events: {
    "click": "loadFolder"
  },

  render: function() {
    var content = this.template({ folder: this.model });
    this.$el.html(content);
    return this;
  },

  loadFolder: function() {
    Backbone.history.navigate("folders/" + this.model.id, { trigger: true });
  }
});
