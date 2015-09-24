Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(this.collection, "add", this._addSubviewToEmail);
    this.collection.fetch({ reset: true });
    Backbone.pubSub.on("deleteThread", this.deleteThread, this);
  },

  events: {
    "click .reply-forward-email-box": "addReplyForwardView",
    "submit": "returnBox"
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

  addReplyForwardView: function() {
    var subview = new Maildog.Views.ReplyForwardEmailBox({
      parentEmail: this.collection.last(),
      originalEmail: this.collection.first(),
      recipient: this.collection.replyTo(),
      collection: this.collection
    });
    $('.reply-forward-email-box').addClass('invisible');
    this.addSubview(".reply-forward-email-section", subview);
    $('textarea').focus();
  },

  returnBox: function(e) {
    e.preventDefault()
    $('.reply-forward-email-box').removeClass('invisible');
  },

  _addSubviewToEmail: function(email) {
    var subview = new Maildog.Views.EmailShow({
      model: email
    });
    this.addSubview(".email-thread-list", subview);
  }
});
