Maildog.Views.FlashMessageList = Backbone.CompositeView.extend({
  template: JST['flashMessageList'],

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  addMessage: function(message) {
    var subview = new Maildog.Views.FlashMessage({ message: message });
    this.addSubview(".flash-message-list", subview);
  },

  removeMessages: function() {
    this.subviews(".flash-message-list").forEach(function(subview) {
      subview.remove();
    })
  }
});
