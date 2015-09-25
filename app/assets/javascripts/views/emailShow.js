Maildog.Views.EmailShow = Backbone.CompositeView.extend({
  template: JST['emailShow'],
  tagName: "ul",
  className: "email-show-item group",

  render: function() {
    var content = this.template({ email: this.model });
    this.$el.html(content);
    return this;
  }
});
