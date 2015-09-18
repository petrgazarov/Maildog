Maildog.Views.PagesMenu = Backbone.View.extend({
  template: JST['pagesMenu'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
