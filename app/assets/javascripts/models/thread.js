Maildog.Models.Thread = Backbone.Model.extend({
  urlRoot: "api/email_threads",

  parse: function(payload) {
    if (payload.tail) {
      this.tail().set(this.tail().parse(payload.tail));

      delete payload.tail;
    }

    if (payload.emails) {
      this.emails().set(payload.emails, { parse: true });

      delete payload.emails;
    }

    return payload
  },

  tail: function() {
    this._tail = (this._tail || new Maildog.Models.Email());

    return this._tail;
  },

  emails: function() {
    this._emails = (this._emails || new Maildog.Collections.Emails());

    return this._emails;
  },

  replyTo: function() {
    for (var i = this.emails().length - 1; i >= 0; i--) {
      var sender = this.emails().at(i).sender();
      if (sender.get('email') != Maildog.currentUser.get('email')) {
        return sender
      }
    }
    return this.emails().last().sender();
  },

  // subject: function() {
  //   if (this.length > 0) {
  //     return this.first().escape('subject');
  //   }
  // }
});
