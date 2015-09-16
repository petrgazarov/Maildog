Maildog.Views.PagesMenu = Backbone.View.extend({
  template: JST['pagesMenu'],
  className: 'pages-menu',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
