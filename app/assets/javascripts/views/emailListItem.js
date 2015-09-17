Maildog.Views.EmailListItem = Backbone.View.extend({
  template: JST['emailListItem'],
  tagName: "li",
  className: "email-list-item",

  render: function() {
    var content = this.template({ email: this.model });
    this.$el.html(content);
    return this;
  }
});
