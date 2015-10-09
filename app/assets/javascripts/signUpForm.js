Maildog.signUpForm = {
  initialize: function() {
    $('#create-account-form').on("submit", this.submitForm.bind(this));
    $('#create-account-form').on('focusin', this.clearErrorMessage.bind(this));
  },

  submitForm: function(e) {
    e.preventDefault();
    this.clearAllErrors();

    var formData = $(e.currentTarget).serializeJSON();

    if (this.validateInput(formData)) {
      this.saveUser(formData);
    }

    this.clearPasswordValues();
  },

  saveUser: function(formData) {
    var user = new Maildog.Models.User();
    user.save(formData.user, {
      success: function() {
        window.location = window.location.origin;
        $('#create-account-form').off();
      },
      error: function(model, response) {
        var errors = $.parseJSON(response.responseText);
        errors.forEach(function(error) {
          if (error === "Username has already been taken") {
            this.displayErrorMessage("This username is already taken", "input", [3]);
          }
        }.bind(this));
      }.bind(this)
    })
  },

  clearAllErrors: function() {
    $('.form-error-message').remove();
    $('input').removeClass('error-input');
  },

  clearPasswordValues: function() {
    $(".create-account-form > input:nth-of-type(4)").val("");
    $(".create-account-form > input:nth-of-type(5)").val("");
  },

  clearErrorMessage: function(e) {
    $(e.target).removeClass('error-input');
    var $next = $(e.target).next();
    if ($next.hasClass('form-error-message')) { $next.remove(); }

    var $next = $(e.target).next();
    if ($next.hasClass('form-error-message')) { $next.remove(); }
  },

  validateInput: function(formData) {
    var valid = true;

    if ($('.sign-up-checkbox:checked').length === 0) {
      this.displayErrorMessage("You must agree to be awesome", "label");
      valid = false;
    }
    if (formData.user.password !== formData.confirmPassword) {
      this.displayErrorMessage("Passwords you entered didn't match", "input", [4, 5]);
      valid = false;
    }
    if (!formData.user['first_name'] || !formData.user['last_name']) {
      this.displayErrorMessage(
        "First name or last name cannot be blank", "input", [2]
      );
      if (!formData.user['first_name']) {
        $(".create-account-form > input:nth-of-type(1)").addClass('error-input');
      }
      else {
        $(".create-account-form > input:nth-of-type(2)").addClass('error-input');
      }
      valid = false;
    }
    if (!formData.user['username']) {
      this.displayErrorMessage("Username cannot be blank", "input", [3]);
      valid = false;
    }
    if (!formData.user['password']) {
      this.displayErrorMessage("Password cannot be blank", "input", [4]);
      valid = false;
    }
    if (formData.user['password'].length > 0 &&
        formData.user['password'].length < 6) {
      this.displayErrorMessage("Password must be minimum 6 characters", "input", [4]);
      valid = false;
    }

    return valid;
  },

  displayErrorMessage: function(message, selector, indices) {
    window.scrollTo(0, 0);

    indices = (typeof indices === 'undefined' ? [7] : indices);

    indices.forEach(function(index) {
      var $message = $("<div>" + message + "<div>").addClass('form-error-message');
      $(".create-account-form > " + selector + ":nth-of-type(" + index + ")")
                                          .addClass('error-input');
      $(".create-account-form > " + selector + ":nth-of-type(" + index +")")
                                          .after($message);
    })
  }
};

$(function() {
  Maildog.signUpForm.initialize()
});
