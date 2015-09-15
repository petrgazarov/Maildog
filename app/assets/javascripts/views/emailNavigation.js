Maildog.Views.EmailNavigation = Backbone.CompositeView.extend({
  template: JST['emailNavigation'],
  id: 'email-navigation',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
