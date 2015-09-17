Maildog.Collections.StarredEmails = Backbone.Collection.extend({
  url: "api/emails/starred",
  model: Maildog.Models.Email
});
