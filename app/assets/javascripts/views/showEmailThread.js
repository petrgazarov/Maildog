Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this._addSubviewForEmail);
    this.model.fetch();
    this.trash = options.trash;
    this._setUpListenersOnInitialize();
    this._emptyCheckedThreads();

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
    this._ajaxDeleteEmails(emailsToDelete);

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

    this._ajaxChangeTrashValue(urlCap, backNav, flashMessage);
    Backbone.pubSub.trigger('checkBox', "remove", [this.model.id]);
  },

  addReplyForwardView: function(options) {
    Maildog.router.removeFlashes();

    var model = (options && options.model) || this._createNewEmail();
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
  },

  returnBox: function(e) {
    e.preventDefault()
    $('.reply-forward-email-box').removeClass('invisible');
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.eachSubview(function (subview) {
      subview.remove();
    });
    Maildog.router.currentEmailThread = null;
  },

  _setUpListenersOnInitialize: function() {
    Backbone.pubSub.on("deleteThread", this.deleteThread, this);
    Backbone.pubSub.on("moveToTrashThread", function() {
      this.changeTrashValue("move_to_trash");
    }.bind(this));
    Backbone.pubSub.on("recoverThread", function() {
      this.changeTrashValue("recover");
    }.bind(this));
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

  _ajaxChangeTrashValue: function(urlCap, backNav, flashMessage) {
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

  _ajaxDeleteEmails: function(emailsToDelete) {
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
  },

  _createNewEmail: function() {
    return new Maildog.Models.Email({
      parent_email_id: this.collection.last().id,
      original_email_id: this.collection.first().id,
      email_thread_id: this.model.id,
      subject: this.model.get('subject')
    });
  },

  _emptyCheckedThreads: function() {
    Backbone.pubSub.trigger('checkBox', "empty");
  }
});
