Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.$el.html(this.template());
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(
      this.model, "sync", this._addSubviewsToEmailThread.bind(this, this.model)
    )
  },

  render: function() {
    this.attachSubviews();
    return this;
  },

  _addSubviewsToEmailThread: function(email) {
    var subview = new Maildog.Views.EmailShow({ model: email });
    this.addSubview(".email-thread-list", subview);

    email.responsesForwards().forEach(function(responseForward) {
      this._addSubviewsToEmailThread(responseForward);
    }.bind(this))
  }
});
