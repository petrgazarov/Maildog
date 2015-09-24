Maildog.Views.ReplyForwardEmailBox = Backbone.View.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {
    template: JST['replyForwardEmailBox'],
    tagName: "form",
    className: "reply-forward-email-form",

    initialize: function(options) {
      this.$el.on("submit", function(e) {
        this.sendEmail(e, {
          saveEmail: false,
          success: function(model) {
            this.collection.add(model);
            this.$el.off("submit");
          }.bind(this)
        })
      }.bind(this));

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
    }
  })
);
