Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend({
  template: JST['composeEmailBox'],
  tagName: 'form',
  className: 'compose-email-popup',

  events: {
    "submit": "sendEmail",
    "click .cancel-compose-box-popup": "removeView"
  },

  initialize: function() {
    this.model = new Maildog.Models.Email();
    this.$el.keypress(this.saveEmail);
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  sendEmail: function(e) {
    e.preventDefault();

    var formData = this.$el.serializeJSON();
    var email = this.model;
    this.removeView({ save: false });

    email.save(formData.email, {
      success: function() {
        Backbone.history.navigate("#", { trigger: true })
        Maildog.router.addFlash("Email message sent");
      }.bind(this),
      error: function() {
        alert("something went wrong!")
      }
    })
  },

  saveEmail: function() {
    debugger
    if (this.saving === true) { return };
    var email = this.model;

    var saving;
    this.saving = saving = true;
    window.setTimeout(function() {
      debugger
      var formData = this.$el.serializeJSON();
      email.set(formData.email);
      if (email.isBlank) {
      //...
      }
      email.save({}, {
        success: function() {
          alert("saved")
        },
        error: function() {
          alert("error")
        }
      });
      saving = false;
    }.bind(this), 2000);
  },

  removeView: function(options) {
    this.$el.off('keypress');
    this.remove();
    if (options && options.save) { return }
    this.saveEmail();
  }
});
