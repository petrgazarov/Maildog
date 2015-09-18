Maildog.Views.EmailNavigation = Backbone.CompositeView.extend({
  template: JST['emailNavigation'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
