Maildog.Views.CustomFolderListItem = Backbone.View.extend({
  template: JST['customFolderListItem'],
  tagName: "li",

  events: {
    "click #delete-folder-cross": "deleteFolder"
  },

  render: function() {
    var content = this.template({ folder: this.model });
    this.$el.html(content);

    if (this.model.isNew()) {
      this.showTextBox();
    }
    return this;
  },

  showTextBox: function() {
    this.$('input').removeClass('invisible').focus();

    window.setTimeout(function() {
      $('html').click(function(e) {
        this.saveFolder(e, { text: this.$('input').val() });
      }.bind(this))
    }.bind(this), 0);
  },

  saveFolder: function(e, options) {
    if ($(e.target).hasClass("new-folder-input")) { return; }
    $('html').off('click');

    this.model.save({ name: options.text }, {
      success: function() {
        this.render();
      }.bind(this)
    });
    this.$('input').addClass('invisible');
  },

  deleteFolder: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.remove();
  }
});
