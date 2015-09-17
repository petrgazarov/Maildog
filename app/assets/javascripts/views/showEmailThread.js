Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.addSubviewsToEmailThread(this.model);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSubviewsToEmailThread: function(email) {
    var subview = new Maildog.Views.EmailShow({ model: email });
    this.addSubview(".email-thread-list", subview);

    if (this.model.responses_forwards()) {
      this.model.responses_forwards().forEach(function(response_forward) {
        this.addSubviewsToEmailThread(response_forward);
      }.bind(this))
    }
  }
});
