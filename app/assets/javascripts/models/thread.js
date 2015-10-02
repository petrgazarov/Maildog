Maildog.Models.Thread = Backbone.Model.extend({
  parse: function(payload) {
    if (payload.tail) {
      this.tail.set(payload.tail);

      delete payload.tail;
    }

    if (payload.emails) {
      this.emails = payload.emails;

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

  // replyTo: function() {
  //   for (var i = this.length - 1; i >= 0; i--) {
  //     var sender = this.at(i).sender();
  //     if (sender.get('email') != Maildog.currentUser.get('email')) {
  //       return sender
  //     }
  //   }
  //   return this.last().sender();
  // },

  // subject: function() {
  //   if (this.length > 0) {
  //     return this.first().escape('subject');
  //   }
  // }
});
