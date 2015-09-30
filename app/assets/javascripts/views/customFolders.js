Maildog.Views.CustomFolders = Backbone.CompositeView.extend({
  template: JST['customFolders'],

  events: {
    "click #create-new-folder-button": "newFolder"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  newFolder: function() {
    var subview = new Maildog.Views.FolderListItem();
    this.addSubview(".custom-folders-list", subview, true);
  }
});
