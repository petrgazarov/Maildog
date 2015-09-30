Maildog.Views.CustomFolders = Backbone.CompositeView.extend({
  template: JST['customFolders'],
  className: "custom-folder-list",

  events: {
    "click #create-new-folder-button": function(e) {
      e.preventDefault();
      var folder = new Maildog.Models.Folder();
      this.addSubviewForFolder(folder);
    }
  },

  initialize: function() {
    this.collection = new Maildog.Collections.Folders();
    this.collection.fetch({ reset: true });
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(
      this.collection, "add", this.addSubviewForFolder.bind(this)
    );
  },

  render: function() {
    this.$el.html(this.template());
    this.collection.forEach(this.addSubviewForFolder.bind(this));
    return this;
  },

  addSubviewForFolder: function(folder, prepend) {
    var subview = new Maildog.Views.CustomFolderListItem({
      collection: this.collection,
      model: folder
    });
    this.addSubview(".custom-folders-list", subview);
  }
});
