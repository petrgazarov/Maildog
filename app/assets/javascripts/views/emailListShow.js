Maildog.Views.EmailListShow = Backbone.CompositeView.extend({
  template: JST['emailListShow'],
  className: 'email-list-show',

  render: function() {
    var content = this.template({ emails: this.collection });
    this.$el.html(content);
    return this;
  }
});
