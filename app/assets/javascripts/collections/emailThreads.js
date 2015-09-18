Maildog.Collections.EmailThreads = Backbone.Collection.extend({
  model: Maildog.Models.Email,

  initialize: function(options) {
    this.emailId = options.id
  },

  url: function() {
    return "api/threads/" + this.emailId 
  }
})
