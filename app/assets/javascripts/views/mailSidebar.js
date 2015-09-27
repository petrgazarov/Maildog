Maildog.Views.MailSidebar = Backbone.CompositeView.extend({
  template: JST['mailSidebar'],
  tagName: "ul",

  render: function() {
    this.$el.html(this.template());
    Maildog.emailFolders = new Maildog.Views.EmailFolders();
    this.addSubview(
      this.$('.email-folders'),
      Maildog.emailFolders
    );
    return this;
  }
});
