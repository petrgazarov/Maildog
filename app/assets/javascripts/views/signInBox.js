Maildog.Views.SignInBox = Backbone.View.extend({
  template: JST['signInBox'],

  events: {
    "click .back-arrow": function(e) {
      this.back(e, Maildog.currentUser.get('username'));
    }
  },

  initialize: function() {
    this.listenTo(Maildog.currentUser, "change", this.render);
  },

  render: function() {
    var content = this.template({ currentUser: Maildog.currentUser });
    this.$el.html(content);
    $.rails.refreshCSRFTokens();
    return this;
  },

  shiftToAuth: function() {
    this.$('.canvas-blue').transition({ height: '100px', width: '100px' }, 'fast');
    this.$('.back-arrow').removeClass('invisible');
    this.$('.email-display').text(Maildog.currentUser.get('email'))
                            .removeClass('invisible');
    this.$('.sign-in-text-box').val("");
    this.$('.sign-in-username-form').addClass('invisible');
    this.$('.sign-in-password-form').removeClass('invisible');
    $('.sign-in-text-box').focus();
  },

  back: function(e, textBoxValue) {
    e.preventDefault();

    this.$('.canvas-blue').transition({ height: '0px', width: '0px' }, 'fast');
    this.$('.back-arrow').addClass('invisible');
    this.$('.sign-in-text-box').val(textBoxValue);
    this.$('.email-display').addClass('invisible');
    this.$('.sign-in-username-form').removeClass('invisible');
    this.$('.sign-in-password-form').addClass('invisible');
    $('.sign-in-text-box').focus();
  },

  tryAgain: function() {
    $('.form-error-message').remove();
    
    $message = $("<div>").text("Sorry, Maildog doesn't recognize that username")
                         .addClass('form-error-message')
    $('.sign-in-text-box').after($message)
    $('.sign-in-text-box').addClass('error-input')
  }
});
