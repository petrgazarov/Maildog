Maildog.Views.MailSidebar = Backbone.CompositeView.extend({
  template: JST['mailSidebar'],
  tagName: "ul",

  render: function() {
    this.$el.html(this.template());
    [Maildog.Views.MainFolders, Maildog.Views.CustomFolders].forEach(function(view) {
      this.addSubview(this.$('.main-folders'), new view());
    }.bind(this))
    return this;
  }
});
