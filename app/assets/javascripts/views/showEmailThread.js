Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.collection.forEach(this.addSubviewToEmailThread.bind(this));
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSubviewToEmailThread: function(email) {
    var subview = new Maildog.Views.EmailShow({ model: email });
    this.addSubview(".email-thread-list", subview);
  }
});
