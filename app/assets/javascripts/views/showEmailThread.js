Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.addSubviewsToEmailThread(this.model);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(Maildog.inboxEmails, "add", this.addSubviewsToEmailThread)
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSubviewsToEmailThread: function(email) {
    var subview = new Maildog.Views.EmailShow({ model: email });
    this.addSubview(".email-thread-list", subview);

    if (this.model.responsesForwards()) {
      this.model.responsesForwards().forEach(function(responseForward) {
        this.addSubviewsToEmailThread(responseForward);
      }.bind(this))
    }
  }
});
