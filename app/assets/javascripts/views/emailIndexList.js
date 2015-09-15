Maildog.Views.EmailIndexList = Backbone.CompositeView.extend({
  template: JST['emailIndexList'],
  id: 'email-index-list',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
