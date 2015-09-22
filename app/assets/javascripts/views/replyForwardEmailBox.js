Maildog.Views.ReplyForwardEmailBox = Backbone.View.extend({
  template: JST['replyForwardEmailBox'],

  initialize: function(options) {
    this.model = new Maildog.Models.Email({
      parent_email_id: options.parentEmail.id,
      original_email_id: options.originalEmail.id
    });
  },

  render: function() {
    var content = this.template();

    return this;
  }
});
