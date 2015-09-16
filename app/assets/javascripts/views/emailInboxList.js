Maildog.Views.EmailInboxList = Backbone.CompositeView.extend({
  template: JST['emailInboxList'],
  className: 'email-inbox-list',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
