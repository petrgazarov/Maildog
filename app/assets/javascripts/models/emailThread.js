Maildog.Models.EmailThread = Backbone.Model.extend({
  urlRoot: "api/email_threads",

  toJSON: function(){
    var json = { email_thread: _.clone(this.attributes) };
    return json;
  },

  parse: function(payload) {
    if (payload.tail) {
      this.tail().set(this.tail().parse(payload.tail));

      delete payload.tail;
    }

    if (payload.emails) {
      this.emails().reset(payload.emails, { parse: true });

      delete payload.emails;
    }

    if (payload.labels) {
      this.labels().reset(payload.labels, { parse: true });

      delete payload.labels;
    }

    if (payload.trashCount) {
      this.trashCount = payload.trashCount;

      delete payload.trashCount;
    }

    if (payload.nonTrashCount) {
      this.nonTrashCount = payload.nonTrashCount;

      delete payload.nonTrashCount;
    }

    return payload
  },

  labels: function() {
    this._labels = (this._labels || new Maildog.Collections.Labels([], {
      url: function() {
        return "api/email_threads/" + this.id + "/labels"
      }.bind(this)
    }));

    return this._labels;
  },

  displayCount: function(folder) {
    var count;

    if (folder === "trash") {
      count = this.trashCount;
    }
    else {
      count = this.nonTrashCount;
    }

    if (count > 1) { return "(" + count + ")" }
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
  }
});
