Maildog.Views.ReplyForwardEmailBox = Backbone.View.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {
    template: JST['replyForwardEmailBox'],
    tagName: "form",
    className: "reply-forward-email-form",

    initialize: function(options) {
      this.recipient = options.recipient;
      this.submitCallback = options.submitCallback;
    },

    events: {
      "submit": "submit",
      "input": "saveEmail",
      "click #delete-reply-forward": function(e) {
        this.discardMessage(e, { composeEmailBox: false })
      }
    },

    submit: function(e) {
      e.preventDefault();
      var draft = this.model.get('draft');

      this.sendEmail({
        saveEmail: false,
        success: function(model) {
          if (draft) {
            this.collection.trigger("add", model);
          } else {
            this.collection.add(model);
          }
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
