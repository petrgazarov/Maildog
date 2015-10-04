Maildog.Mixins.NewEmail = {
  saveEmail: function() {
    if (this.saving === true) { return; };

    this.saving = true;
    this.$('.saving-saved').text("");
    window.setTimeout(function() {
      if (this.sending) { return; }

      this.$('.saving-saved').text("Saving");
      var formData = this.$el.serializeJSON();
      formData.email.draft = true;

      this.model.save(formData.email, {
        success: function(model) {
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
    if (!formData.email.addressees.email) { return }
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

  discardMessage: function() {
    if (!this.model.isNew()) {
      this.model.destroy();
    }

    if (this.model.isNew() || this.model.get('draft')) {
      Maildog.router.addFlash("Your message has been discarded");
    }
    window.setTimeout(function() {
      this.removeView();
    }.bind(this), 0);
  },

  removeView: function(e, sendOptions) {
    this.remove();
    if (!sendOptions || !sendOptions.saveEmail) { return }
    this.saveEmail();
  }
};
