Maildog.Views.ReplyForwardEmailBox = Backbone.View.extend({
  template: JST['replyForwardEmailBox'],

  initialize: function(options) {
    this.model = new Maildog.Models.Email({
      parent_email_id: options.parentEmail.id,
      original_email_id: options.originalEmail.id
    });
    this.recipient = options.recipient;
  },

  render: function() {
    var content = this.template({
      email: this.model,
      recipient: this.recipient
    });
    this.$el.html(content);

    return this;
  }
});
