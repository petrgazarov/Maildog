Maildog.Views.CustomFolders = Backbone.CompositeView.extend({
  template: JST['customFolders'],

  events: {
    "click #create-new-folder-button": function(e) {
      e.preventDefault();
      var folder = new Maildog.Models.Folder();
      this.addSubviewForFolder(folder, true);
    }
  },

  initialize: function() {
    this.collection = new Maildog.Collections.Folders();
    this.collection.fetch({ reset: true });
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(
      this.collection, "add", this.addSubviewForFolder.bind(this, false)
    );
  },

  render: function() {
    this.$el.html(this.template());
    this.collection.forEach(this.addSubviewForFolder.bind(this, false));
    return this;
  },

  addSubviewForFolder: function(folder, prepend) {
    var subview = new Maildog.Views.CustomFolderListItem({
      collection: this.collection,
      model: folder
    });
    this.addSubview(".custom-folders-list", subview, prepend);
  }
});
