Maildog.Views.EmailNavigation = Backbone.CompositeView.extend({
  template: JST['emailNavigation'],
  className: 'email-nav',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
