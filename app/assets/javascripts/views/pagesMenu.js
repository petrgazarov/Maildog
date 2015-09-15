Maildog.Views.PagesMenu = Backbone.View.extend({
  template: JST['pagesMenu'],
  id: 'pages-menu',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
