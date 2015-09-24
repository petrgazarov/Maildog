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
    debugger
    this.$el.html(this.template());
    this.collection.forEach(this._addSubviewToEmail.bind(this));
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

  addReplyForwardView: function(options) {
    var newEmail = options.model ||
      new Maildog.Models.Email({
        parent_email_id: this.collection.last().id,
        original_email_id: this.collection.first().id,
        subject: this.collection.first().get('subject')
      });

    var model = (options && options.model) || newEmail;
    var subview = new Maildog.Views.ReplyForwardEmailBox({
      model: model,
      recipient: this.collection.replyTo(),
      collection: this.collection
    });
    if (!options || !options.leaveBox) {
      $('.reply-forward-email-box').addClass('invisible');
    }
    this.addSubview(".reply-forward-email-section", subview);
    $('textarea').focus();
  },

  returnBox: function(e) {
    e.preventDefault()
    $('.reply-forward-email-box').removeClass('invisible');
  },

  _addSubviewToEmail: function(email) {
    var subview;
    if (email.get('draft')) {
      this.addReplyForwardView({ model: email, leaveBox: true });
    } else {
      subview = new Maildog.Views.EmailShow({
        model: email
      });
      this.addSubview(".email-thread-list", subview);
    }
  }
});
