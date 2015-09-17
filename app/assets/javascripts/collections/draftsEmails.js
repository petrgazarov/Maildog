Maildog.Collections.DraftsEmails = Backbone.Collection.extend({
  url: "api/emails/drafts",
  model: Maildog.Models.Email
});
