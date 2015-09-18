Maildog.Views.MailSidebar = Backbone.CompositeView.extend({
  template: JST['mailSidebar'],

  render: function() {
    this.$el.html(this.template());
    this.addSubview(
      this.$('.email-folders'),
      new Maildog.Views.EmailFolders()
    );
    return this;
  }
});
