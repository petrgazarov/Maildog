Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {

    template: JST['composeEmailBox'],
    tagName: 'form',
    className: 'compose-email-popup',

    initialize: function(options) {
      this.model = ((options && options.email) || new Maildog.Models.Email());
    },

    events: {
      "click .cancel-compose-box-popup": "removeView",
      "submit": "submit",
      "input": "saveEmail"
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
