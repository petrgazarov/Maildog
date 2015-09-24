Maildog.Mixins.NewEmail = {
  saveEmail: function() {
    if (this.saving === true) { return; };

    this.saving = true;
    var email = this.model;
    this.$('.saving-saved').text("");
    window.setTimeout(function() {
      this.$('.saving-saved').text("Saving");
      var formData = this.$el.serializeJSON();
      formData.email.draft = true;
      email.set(formData.email);
      email.save({}, {
        success: function() {
          window.setTimeout(function() { this.$('.saving-saved').text("Saved") }, 1000);
        },
        error: function() {
          alert("error")
        }
      });
      this.saving = false;
    }.bind(this), 2000);
  },

  sendEmail: function(e, sendOptions) {
    e.preventDefault();
    var formData = this.$el.serializeJSON();
    this.removeView(sendOptions);

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
    this.$el.off('input');
    this.remove();
    if (sendOptions && !sendOptions.saveEmail) { return }
    this.saveEmail();
  }
};



// sendEmail: function(e) {
//   e.preventDefault();
//
//   var formData = this.$el.serializeJSON();
//   var email = this.model;
//   this.removeView({ saveEmail: false });
//
//   email.save(formData.email, {
//     success: function() {
//       options.callback && options.callback();
//       Maildog.router.addFlash("Email message sent");
//     }.bind(this),
//     error: function() {
//       alert("something went wrong!")
//     }
//   })
// },
