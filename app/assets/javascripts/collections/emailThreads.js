Maildog.Collections.EmailThreads = Backbone.Collection.extend({
  model: Maildog.Models.Email,

  initialize: function(models, options) {
    options && (this.urlAction = options.urlAction);
  },

  url: function() {
    return "api/threads/" + this.urlAction
  },

  parse: function(payload) {
    if (payload.email_labels) {
      this.emailLabels = payload.email_labels;

      delete payload.email_labels;
    }

    return payload;
  },

  tail: function() {
    this._tail = (this._tail || new Maildog.Models.Email());

    return this._tail;
  }

  destroy: function(options) {
    $.ajax({
      url: this.url(),
      method: 'DELETE',
      dataType: "json",
      success: function() {
        Maildog.inboxEmails.remove(this.emailId);
        options && options.success();
        this.remove();
      }.bind(this)
    });
  },

  replyTo: function() {
    for (var i = this.length - 1; i >= 0; i--) {
      var sender = this.at(i).sender();
      if (sender.get('email') != Maildog.currentUser.get('email')) {
        return sender
      }
    }
    return this.last().sender();
  },

  subject: function() {
    if (this.length > 0) {
      return this.first().escape('subject');
    }
  }
});
