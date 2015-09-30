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
    this.$('input').removeClass('invisible');
  }
});
