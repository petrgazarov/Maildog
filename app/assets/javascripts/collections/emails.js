Maildog.Collections.Emails = Backbone.Collection.extend({
  model: Maildog.Models.Email,

  initialize: function(models, options) {
    options && (this.urlAction = options.urlAction || "this folder");
    options && (this.url = options.url || this.defineUrl());
  },

  defineUrl: function() {
    return "/api/emails/" + this.urlAction
  },

  folderName: function() {
    var name = this.urlAction[0].toUpperCase() + this.urlAction.slice(1);
    if (name === "Sent") { name += " Mail" };
    return name;
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
    return "No conversations in " + this.folderName();
  }
});
