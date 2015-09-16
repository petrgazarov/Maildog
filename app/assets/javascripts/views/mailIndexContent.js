Maildog.Views.EmailIndexContent = Backbone.CompositeView.extend({
  template: JST['emailIndexContent'],

  className: "email-index-content",

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
