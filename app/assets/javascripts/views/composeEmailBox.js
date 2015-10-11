Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {

    template: JST['composeEmailBox'],
    tagName: 'form',
    className: 'compose-email-popup',

    initialize: function(options) {
      this.model = ((options && options.email) || new Maildog.Models.Email());
    },

    events: {
      "submit": "submit",
      "input": "saveEmail",
      "click #delete-message": function(e) {
        this.discardMessage(e, { composeEmailBox: true })
      },
      "click #cancel-compose-box-popup": function(e) {
        this.removeView(e, {
          saveEmail: true,
          composeEmailBox: true
        });
      }
    },

    submit: function(e) {
      e.preventDefault();
      this.sendEmail({
        saveEmail: false,
        composeEmailBox: true
      })
    },

    render: function() {
      this.$el.html(this.template({ email: this.model }));
      return this;
    }
  })
);
