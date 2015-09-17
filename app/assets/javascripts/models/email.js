Maildog.Models.Email = Backbone.Model.extend({
  urlRoot: "api/emails",

  parse: function(payload) {
    if (payload.sender) {
      this.sender().set(payload.sender, { parse: true })
      delete payload.sender
    }
    return payload
  },

  sender: function() {
    this._sender || (this._sender = new Maildog.Models.Contact())
    return this._sender
  }
});
