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

      if ($("input[name='email[addressees][email]']").val() == "") {
        Maildog.router.addFlash("Looks like you forgot to include a recipient!", 8000)
        return;
      }
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
