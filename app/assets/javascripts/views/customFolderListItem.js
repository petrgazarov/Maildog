Maildog.Views.CustomFolderListItem = Backbone.View.extend({
  templateWithCross: JST['customFolderListItem'],
  templateNameOnly: JST['emailOptionsFolderListItem'],
  tagName: "li",

  events: {
    "click #delete-folder-cross": "deleteFolder"
  },

  initialize: function(options) {
    if (options.template === "nameOnly") {
      this.template = this.templateNameOnly;
    } else {
      this.template = this.templateWithCross;
    }
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
