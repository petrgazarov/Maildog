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
    this.$el.on("input", $.proxy(this.saveEmail, this));
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  sendEmail: function(e) {
    e.preventDefault();

    var formData = this.$el.serializeJSON();
    var email = this.model;
    this.removeView({ saveEmail: false });

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
    if (this.saving === true) { return };

    this.saving = true;
    var email = this.model;
    window.setTimeout(function() {
      var formData = this.$el.serializeJSON();
      formData.email.draft = true;
      email.set(formData.email);
      if (email.isBlank()) {
        email.destroy();
        return;
      }
      email.save({}, {
        success: function() {
          alert("saved")
        },
        error: function() {
          alert("error")
        }
      });
      this.saving = false;
    }.bind(this), 2000);
  },

  removeView: function(options) {
    this.$el.off('input');
    this.remove();
    if (options && !options.saveEmail) { return }
    this.saveEmail();
  }
});
