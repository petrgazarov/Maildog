Maildog.Collections.EmailThreads = Backbone.Collection.extend({
  model: Maildog.Models.Thread,

  initialize: function(models, options) {
    options && (this.urlAction = options.urlAction);
  },

  url: function() {
    return "api/email_threads/" + this.urlAction
  },

  parse: function(payload) {
    if (payload.email_labels) {
      this.emailLabels = payload.email_labels;

      delete payload.email_labels;
    }

    return payload;
  },

  folderName: function() {
    var name = this.urlAction[0].toUpperCase() + this.urlAction.slice(1);
    if (name === "Sent") { name += " Mail" };
    return name;
  },
});
