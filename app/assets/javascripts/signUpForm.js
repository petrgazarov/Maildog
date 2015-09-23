Maildog.signUpForm = {
  initialize: function() {
    $('#create-account-form').on("submit", this.submitForm)
  },

  submitForm: function(e) {
    var formData = $(e.currentTarget).serializeJSON();
    var user = new Maildog.Models.User
    user.save(formData.user, {
      success: function() {
        window.location = window.location.origin
      }
    })
  }
};

$(function() {
  Maildog.signUpForm.initialize()
});
