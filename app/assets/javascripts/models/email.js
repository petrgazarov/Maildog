Maildog.Models.Email = Backbone.Model.extend({
  urlRoot: "api/emails",

  parse: function(payload) {
    if (payload.sender) {
      this.sender().set(payload.sender, { parse: true });
      delete payload.sender
    };

    return payload
  },

  sender: function() {
    this._sender = (this._sender || new Maildog.Models.Contact())
    return this._sender
  },

  preview: function() {
    return ("- " + this.get('body').slice(0, 50));
  },

  getTimeOrDate: function() {
    var today = new Date();
    if (today === this.get('date')) {
      return this.get('time');
    }
    else {
      return this.get('date');
    };
  }
});
