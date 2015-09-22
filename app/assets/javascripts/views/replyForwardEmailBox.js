Maildog.Views.ReplyForwardEmailBox = Backbone.View.extend({
  template: JST['replyForwardEmailBox'],
  tagName: "form",

  events: {
    "submit": "sendEmail"
  },

  initialize: function(options) {
    this.model = new Maildog.Models.Email({
      parent_email_id: options.parentEmail.id,
      original_email_id: options.originalEmail.id,
      subject: options.originalEmail.get('subject')
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
  },

  sendEmail: function(e) {
    e.preventDefault();
    var formData = this.$el.serializeJSON();
    this.model.set(formData.email);
    this.remove();

    this.model.save(formData.email, {
      success: function() {
        Backbone.history.navigate("#", { trigger: true })
        Maildog.router.addFlash("Email message sent");
      }.bind(this),
      error: function() {
        alert("something went wrong!")
      }
    })
  }
});
