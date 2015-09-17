Maildog.Views.EmailListShow = Backbone.CompositeView.extend({
  template: JST['emailListShow'],
  className: 'email-list-show',

  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var content = this.template({ emails: this.collection });
    this.$el.html(content);
    return this;
  }
});
