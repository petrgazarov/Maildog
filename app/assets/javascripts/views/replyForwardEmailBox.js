Maildog.Views.ReplyForwardEmailBox = Backbone.View.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {
    template: JST['replyForwardEmailBox'],
    tagName: "form",
    className: "reply-forward-email-form",

    initialize: function(options) {
      this.recipient = options.recipient;
    },

    events: {
      "submit": "submit",
      "input": "saveEmail"
    },

    submit: function(e) {
      e.preventDefault();

      this.sendEmail({
        saveEmail: false,
        success: function(model) {
          this.collection.add(model);
          this.collection.trigger("add", model);
        }.bind(this)
      })
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
