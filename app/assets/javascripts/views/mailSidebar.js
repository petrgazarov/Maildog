Maildog.Views.MailSidebar = Backbone.CompositeView.extend({
  template: JST['mailSidebar'],
  tagName: "ul",

  render: function() {
    this.$el.html(this.template());
    Maildog.mainFolders = new Maildog.Views.MainFolders();

    this.addSubview('.main-folders', Maildog.mainFolders);
    this.addSubview('.labels', new Maildog.Views.LabelList());
    return this;
  }
});
