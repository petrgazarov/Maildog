Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this._addSubviewForEmail);
    this.model.fetch();
    this.trash = options.trash;
    Backbone.pubSub.on("deleteThread", this.deleteThread, this);
    Maildog.router.currentEmailThread = this.model;
  },

  events: {
    "click .reply-forward-email-box": "addReplyForwardView",
    "submit": "returnBox",
    "click #delete-reply-forward": "returnBox"
  },

  render: function() {
    this.$el.html(this.template());
    this.collection.forEach(this._addSubviewForEmail.bind(this));
    this.$('#email-thread-subject').text(this.model.get('subject'));
    this.attachSubviews();
    return this;
  },

  deleteThread: function() {
    var email_ids = [];
    this.collection.forEach(function(email) {
      email_ids.push(email.id);
    });

    $.ajax({
      url: "api/emails/trash",
      type: "POST",
      data: { "email_ids": email_ids },
      dataType: "json",
      success: function() {
        Backbone.history.navigate("#", { trigger: true })
        Maildog.router.addFlash("The conversation has been moved to the Trash.");
      },
      error: function() {
        alert("error");
      }
    });
  },

  addReplyForwardView: function(options) {
    var newEmail = options.model ||
      new Maildog.Models.Email({
        parent_email_id: this.collection.last().id,
        original_email_id: this.collection.first().id,
        email_thread_id: this.model.id,
        subject: this.model.get('subject')
      });

    var model = (options && options.model) || newEmail;
    var subview = new Maildog.Views.ReplyForwardEmailBox({
      model: model,
      recipient: this.model.replyTo(),
      collection: this.collection
    });
    if (!options || !options.leaveBox) {
      $('.reply-forward-email-box').addClass('invisible');
    }
    this.addSubview(".reply-forward-email-section", subview);
    $('textarea').focus();
    Maildog.router.removeFlashes();
  },

  returnBox: function(e) {
    e.preventDefault()
    $('.reply-forward-email-box').removeClass('invisible');
  },

  _addSubviewForEmail: function(email) {
    var subview;
    if (email.get('draft')) {
      this.addReplyForwardView({ model: email, leaveBox: true });
    }
    else if (this.trash && email.get('trash') ||
            !this.trash && !email.get('trash')) {
      subview = new Maildog.Views.EmailShow({
        model: email
      });

      this.addSubview(".email-thread-list", subview);
    }
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.eachSubview(function (subview) {
      subview.remove();
    });
    Maildog.router.currentEmailThread = null;
  },
});
