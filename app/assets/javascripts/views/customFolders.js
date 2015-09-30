Maildog.Views.CustomFolders = Backbone.CompositeView.extend({
  template: JST['customFolders'],

  events: {
    "click #create-new-folder-button": "newFolder"
  },

  initialize: function() {
    this.collection = new Maildog.Collections.Folders();
    this.collection.fetch({ reset: true });
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(
      this.collection, "add", this.addSubviewForFolder.bind(this, true)
    );
  },

  render: function() {
    this.$el.html(this.template());
    this.collection.forEach(this.addSubviewForFolder.bind(this, false));
    return this;
  },

  addSubviewForFolder: function(folder, prepend) {
    var subview = new Maildog.Views.FolderListItem({
      collection: this.collection,
      model: folder
    });
    this.addSubview(".custom-folders-list", subview, prepend);
  }
});
