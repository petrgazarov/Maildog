Maildog.Collections.SentEmails = Backbone.Collection.extend({
  url: "api/emails/sent",
  model: Maildog.Models.Email
});