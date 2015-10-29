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
      string = this._getSentTo();
    }
    else if (folder === "drafts") {
      string = "Draft";
    }
    else {
      string = this._getSender(folder);
    }

    return string;
  },

  addressees: function() {
    this._addressees = (this._addressees || new Maildog.Collections.Contacts())
    return this._addressees;
  },

  preview: function() {
    return ("- " + this.get('body').slice(0, 100));
  },

  getTimeOrDate: function() {
    var time = moment(this.get('time'));

    if (moment().isSame(time, "day")) {
      return time.format('h:mma')
    } else {
      return time.format('MMM D')
    }
  },

  starOnIfStarred: function() {
    if (this.get('starred')) { return "star-on" }
  },

  checkedIfChecked: function() {
    if (this.get('checked')) { return "checked" }
  },

  checkedCheckBoxIfChecked: function() {
    if (this.get('checked')) { return "checked-check-box" }
  },

  _getSentTo: function() {
    if (
      this.addressees().first().get('email') !== Maildog.currentUser.get('email')
    ) {
      return "To: " + this.addressees().first().escape('email').split("@")[0];
    } else {
      return "To: " + this.sender().escape('email').split("@")[0];
    }
  },

  _getSender: function(folder) {
    if (this.sender().get('email') !== Maildog.currentUser.get('email') ||
        folder === "trash") {
      var string = this.sender().escape('first_name') + " " +
                   this.sender().escape('last_name');
    }
    else {
      var string = this.addressees().first().escape('first_name') + " " +
                   this.addressees().first().escape('last_name')
    }

    return string;
  }
});
