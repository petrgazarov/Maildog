Maildog.Views.EmailIndexContent = Backbone.CompositeView.extend({
  template: JST['emailIndexContent'],
  className: "email-list",

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
