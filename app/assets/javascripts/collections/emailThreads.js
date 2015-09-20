Maildog.Collections.EmailThreads = Backbone.Collection.extend({
  model: Maildog.Models.Email,

  initialize: function(options) {
    this.emailId = options.id
  },

  url: function() {
    return "api/threads/" + this.emailId
  },

  destroy: function(options) {
    $.ajax({
      url: this.url(),
      method: 'DELETE',
      success: function() {
        Maildog.inboxEmails.remove(this.emailId);
        options.success();
        this.remove();
      }.bind(this)
    });
  }
})
