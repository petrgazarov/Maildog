Maildog.Mixins.NewEmail = {
  saveEmail: function() {
    if (this.saving === true) { return; };

    this.saving = true;
    var email = this.model;
    this.$('.saving-saved').text("");
    window.setTimeout(function() {
      if (this.sending) { return; }
      this.$('.saving-saved').text("Saving");
      var formData = this.$el.serializeJSON();
      formData.email.draft = true;
      email.set(formData.email);
      email.save({}, {
        success: function() {
          window.setTimeout(function() {
            this.$('.saving-saved').text("Saved");
            this.saving = false;
          }.bind(this), 700);
        }.bind(this),
        error: function() {
          alert("error")
        }
      });
    }.bind(this), 2000);
  },

  sendEmail: function(sendOptions) {
    this.sending = true;

    var formData = this.$el.serializeJSON();
    this.removeView(sendOptions);
    this.model.set("draft", false);

    this.model.save(formData.email, {
      success: function(model) {
        sendOptions.success && sendOptions.success(model);
        Maildog.router.addFlash("Email message sent");
      }.bind(this),
      error: function() {
        Maildog.router.addFlash("something went wrong!");
      }
    })
  },

  removeView: function(sendOptions) {
    this.remove();
    if (sendOptions && !sendOptions.saveEmail) { return }
    this.saveEmail();
  }
};
