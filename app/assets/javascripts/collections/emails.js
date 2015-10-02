Maildog.Collections.Emails = Backbone.Collection.extend({
  model: Maildog.Models.Email,

  initialize: function(models, options) {
    options && (this.urlAction = options.urlAction || "this label");
    options && (this.url = options.url || this.defineUrl());
  },

  defineUrl: function() {
    return "/api/emails/" + this.urlAction
  },

  getOrFetch: function(id) {
    var email = this.get(id);
    if (email) {
      email.fetch();
    }
    else {
      email = new Maildog.Models.Email({ id: id });
      this.add(email);
      email.fetch({
        errors: function() {
          this.remove(email)
        }.bind(this)
      })
    };

    return email;
  },

  noConversationsMemo: function() {
    if (this.urlAction === "this label") {
      return "No conversations with this label";
    } else {
      return "No conversations in " + this.folderName();
    }
  }
});
