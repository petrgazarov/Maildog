Maildog.Collections.InboxEmails = Backbone.Collection.extend({
  url: "api/emails/inbox",
  model: Maildog.Models.Email
});
