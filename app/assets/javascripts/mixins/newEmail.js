Maildog.Mixins.NewEmail = {
  saveEmail: function() {
    if (this.saving === true) { return; };

    this.saving = true;
    this.$('.saving-saved').text("");
    window.setTimeout(function() {
      if (this.dontSave) { return; }

      this.$('.saving-saved').text("Saving");
      var formData = this.$el.serializeJSON();
      formData.email.draft = true;

      this.model.save(formData.email, {
        success: function(model) {
          window.setTimeout(function() {
            this.$('.saving-saved').text("Saved");
            this.saving = false;
            Maildog.currentThreadList &&
              Maildog.currentThreadList.refreshCollection();
          }.bind(this), 700);
        }.bind(this),
        error: function() {
          alert("error")
        }
      });
    }.bind(this), 2000);
  },

  sendEmail: function(sendOptions) {
    Maildog.router.addFlash("Sending...")
    this.dontSave = true;

    var formData = this.$el.serializeJSON();
    if (!formData.email.addressees.email) { return }
    this.removeView({}, sendOptions);
    this.model.set("draft", false);

    this.model.save(formData.email, {
      success: function(model) {
        sendOptions.success && sendOptions.success(model);
        Maildog.router.addFlash("Email message sent");
        Maildog.currentThreadList && Maildog.currentThreadList.refreshCollection();
      }.bind(this),
      error: function() {
        Maildog.router.addFlash("something went wrong!");
      }
    })
  },

  discardMessage: function(e, options) {
    this.dontSave = true;

    if (!this.model.isNew()) {
      this.model.destroy();
    }

    if (this.model.isNew() || this.model.get('draft')) {
      Maildog.router.addFlash("Your message has been discarded");
    }
    window.setTimeout(function() {
      this.removeView(e, options);
    }.bind(this), 0);
    Maildog.currentThreadList && Maildog.currentThreadList.refreshCollection();
  },

  removeView: function(e, options) {
    if (options.composeEmailBox) {
      Maildog.mainFolders.removeSubview('.compose-email-popup-container', this);
    }
    else {
      this.remove();
    }
    Maildog.currentThreadList && Maildog.currentThreadList.refreshCollection();
    if (!options || !options.saveEmail) { return }
    this.saveEmail();
  }
};
