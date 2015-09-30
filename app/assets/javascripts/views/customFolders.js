Maildog.Views.CustomFolders = Backbone.CompositeView.extend({
  template: JST['customFolders'],

  events: {
    "click #create-new-folder-button": "showTextBox"
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

  showTextBox: function(e) {
    e.preventDefault();
    this.$('#create-new-folder-button').prop('disabled', true);
    this.$('.new-folder-input').removeClass('invisible').focus();

    window.setTimeout(function() {
      $('html').click(function(e) {
        this.newFolder(e, { text: this.$('input').val() });
      }.bind(this))
    }.bind(this), 0);
  },

  newFolder: function(e, options) {
    if ($(e.target).hasClass("new-folder-input")) { return; }
    $('html').off('click');
    if (options.text) {
      folder = new Maildog.Models.Folder({ name: options.text })
      folder.save({}, {
        success: function(model) {
          this.collection.add(model)
        }.bind(this)
      });
      this.$('input').val("");
    }
    this.$('input').addClass('invisible');
    this.$('#create-new-folder-button').prop('disabled', false);
  },

  addSubviewForFolder: function(folder, prepend) {
    var subview = new Maildog.Views.CustomFolderListItem({
      collection: this.collection,
      model: folder
    });
    this.addSubview(".custom-folders-list", subview);
  }
});
