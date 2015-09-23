Maildog.Collections.Emails = Backbone.Collection.extend({
  model: Maildog.Models.Email,

  initialize: function(models, options) {
    options && (this.urlAction = options.urlAction);
  },

  url: function() {
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
  }
});
