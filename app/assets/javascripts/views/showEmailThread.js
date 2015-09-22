Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "add", this._addSubviewToEmail);
    this._addReplyForwardSubview();
    Backbone.pubSub.on("deleteThread", this.deleteThread, this);
  },

  render: function() {
    this.collection.forEach(this._addSubviewToEmail.bind(this));
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  deleteThread: function() {
    this.collection.destroy({
      success: function() {
        Backbone.history.navigate("#", { trigger: true })
        Maildog.router.addFlash("Email conversation deleted");
      }
    });
  },

  _addReplyForwardSubview: function() {

  },

  _addSubviewToEmail: function(email) {
    var subview = new Maildog.Views.EmailShow({
      model: email
    });
    this.addSubview(".email-thread-list", subview);
  }
});
