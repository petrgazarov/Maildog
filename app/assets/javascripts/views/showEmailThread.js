Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this._addSubviewForEmail);
    this.model.fetch();
    this.trash = options.trash;
    Backbone.pubSub.on("deleteThread", this.deleteThread, this);
    Backbone.pubSub.on("moveToTrashThread", function() {
      this.changeTrashValue("move_to_trash");
    }.bind(this));
    Backbone.pubSub.on("recoverThread", function() {
      this.changeTrashValue("recover");
    }.bind(this));

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
    var emailsToDelete = [];

    this.collection.forEach(function(email) {
      if (email.get('trash')) {
        emailsToDelete.push(email);
      }
    });
    for (var i = 0; i < emailsToDelete.length; i++) {
      emailsToDelete[i].destroy({
        success: function(model) {
          Maildog.trash.remove(model)
        },
        error: function() {
          alert('error');
        }
      });
    }

    Backbone.history.navigate("#trash", { trigger: true })
    Maildog.router.addFlash("The conversation has been deleted.");
  },

  changeTrashValue: function(urlCap) {
    var email_ids = [];
    if (urlCap === 'move_to_trash') {
      var flashMessage = "The conversation has been moved to the Trash.";
      var backNav = "#";
    } else {
      var flashMessage = "The conversation has been recovered."
      var backNav = "#trash";
    }

    $.ajax({
      url: "api/email_threads/" + urlCap,
      type: "POST",
      data: { "email_thread_ids": [this.model.id] },
      dataType: "json",
      success: function() {
        Backbone.history.navigate(backNav, { trigger: true })
        Maildog.router.addFlash(flashMessage);
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
