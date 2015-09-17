Maildog.Collections.InboxEmails = Backbone.Collection.extend({
  url: "api/emails/inbox",
  model: Maildog.Models.Email,

  getOrFetch: function(id) {
    var email = this.get(id);
    if (email) {
      email.fetch();
    }
    else {
      email = new Maildog.Models.Email({ id: id });
      this.add(email);
      email.save({
        errors: function() {
          this.remove(email)
        }.bind(this)
      })
    };

    return email;
  }
});
