Maildog.Views.CustomFolderListItem = Backbone.View.extend({
  template: JST['customFolderListItem'],
  tagName: "li",

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
      $('html').click(function() {
        this.saveOrUpdateFolder({ text: this.$('input').val });
      }.bind(this))
    }.bind(this), 0);
  },

  saveOrUpdateFolder: function(options) {
    $('html').off('click');

    this.model.save({ name: options.text }, {
      success: function() {
        this.render();
      }.bind(this)
    });
    this.$('input').addClass('invisible');
  }
});
