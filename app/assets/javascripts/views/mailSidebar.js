Maildog.Views.MailSidebar = Backbone.CompositeView.extend({
  template: JST['mailSidebar'],
  tagName: "ul",

  render: function() {
    this.$el.html(this.template());
    this.addSubview('.main-folders', new Maildog.Views.MainFolders());
    this.addSubview('.custom-folders', new Maildog.Views.CustomFolders());
    return this;
  }
});
