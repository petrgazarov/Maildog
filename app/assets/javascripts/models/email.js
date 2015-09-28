Maildog.Models.Email = Backbone.Model.extend({
  urlRoot: "api/emails",

  toJSON: function(){
    var json = { email: _.clone(this.attributes) };
    return json;
  },

  parse: function(payload) {
    if (payload.sender) {
      this.sender().set(payload.sender, { parse: true });
      delete payload.sender;
    }

    if (payload.responses_forwards) {
      this.responsesForwards().set(payload.responses_forwards, { parse: true });
      delete payload.responses_forwards;
    }

    if (payload.addressees) {
      this.addressees().set(payload.addressees, { parse: true });
      delete payload.addressees
    }
    return payload;
  },

  responsesForwards: function() {
    this._responsesForwards = (
      this._responsesForwards || new Maildog.Collections.Emails()
    );
    return this._responsesForwards;
  },

  sender: function() {
    this._sender = (this._sender || new Maildog.Models.Contact())
    return this._sender;
  },

  correspondentString: function(folder) {
    var string;
    if (folder === "sent") {
      string = "To: " + this.addressees().first().escape('email');
    }
    else if (folder === "drafts") {
      string = "Draft";
    }
    else {
      string = this.sender().escape('first_name') + " " +
               this.sender().escape('last_name');
    }

    return string;
  },

  addressees: function() {
    this._addressees = (this._addressees || new Maildog.Collections.Contacts())
    return this._addressees;
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
