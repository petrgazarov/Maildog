Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend(
  _.extend({}, Maildog.Mixins.NewEmail, {

    template: JST['composeEmailBox'],
    tagName: 'form',
    className: 'compose-email-popup',

    events: {
      "click .cancel-compose-box-popup": "removeView"
    },

    initialize: function(options) {
      this.$el.on("submit", function(e) {
        this.sendEmail(e, {
          saveEmail: false,
          success: function(){
            Backbone.history.navigate("#", { trigger: true })
          }.bind(this)
        })
      }.bind(this));
      this.model = ((options && options.email) || new Maildog.Models.Email());
      this.$el.on("input", $.proxy(this.saveEmail, this));
    },

    render: function() {
      this.$el.html(this.template({ email: this.model }));
      return this;
    }
  })
);
