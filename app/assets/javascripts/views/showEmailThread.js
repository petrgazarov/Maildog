Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.listenTo(this.collection, "add", this._addSubviewToEmail);
    this.collection.forEach(this._addSubviewToEmail.bind(this));
    Backbone.pubSub.on("deleteThread", this.deleteThread, this);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  _addSubviewToEmail: function(email) {
    var subview = new Maildog.Views.EmailShow({
      model: email,
      collection: this.collection
    });
    this.addSubview(".email-thread-list", subview);
  },

  deleteThread: function() {
    this.collection.destroy(function() {
      Backbone.history.navigate("#", { trigger: true })
      var flashView = new Maildog.Views.FlashMessage({
        message: "Email conversation deleted"
      });
      Maildog.router.currentFlashView = flashView;
      Maildog

    });
  }
});
