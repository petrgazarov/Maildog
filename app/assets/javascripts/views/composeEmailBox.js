Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {

    template: JST['composeEmailBox'],
    tagName: 'form',
    className: 'compose-email-popup',

    initialize: function(options) {
      this.model = ((options && options.email) || new Maildog.Models.Email());
    },

    events: {
      "click #delete-message": "discardMessage",
      "submit": "submit",
      "input": "saveEmail",
      "click #cancel-compose-box-popup": function(e) {
        this.removeView(e, { saveEmail: true });
      }
    },

    submit: function(e) {
      e.preventDefault();
      this.sendEmail({
        saveEmail: false
      })
    },

    render: function() {
      this.$el.html(this.template({ email: this.model }));
      return this;
    }
  })
);
