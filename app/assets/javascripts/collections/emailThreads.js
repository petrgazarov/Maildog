Maildog.Collections.EmailThreads = Backbone.Collection.extend({
  model: Maildog.Models.Thread,

  initialize: function(models, options) {
    this.urlAction = (options.urlAction || "this label");
    this.url = (options.url || this.defineUrl());

    this.comparator = options.comparator ||
      function(thread) {
        return [thread.tail().get('date'), thread.tail().get('time')]
      }
  },

  defineUrl: function() {
    return "/api/email_threads/" + this.urlAction
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

  noConversationsMemo: function() {
    if (this.urlAction === "this label") {
      return "No conversations with this label";
    } else {
      return "No conversations in " + this.folderName();
    }
  }
});
