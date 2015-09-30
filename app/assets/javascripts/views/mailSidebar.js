Maildog.Views.MailSidebar = Backbone.CompositeView.extend({
  template: JST['mailSidebar'],
  tagName: "ul",

  render: function() {
    this.$el.html(this.template());
    Maildog.mainFolders = new Maildog.Views.MainFolders();
    this.addSubview(
      this.$('.email-folders'),
      Maildog.mainFolders
    );
    return this;
  }
});
