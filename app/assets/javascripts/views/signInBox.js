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
    this.$('.sign-in-form-container').transition({ height: '259px'});
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
    this.$('.sign-in-form-container').transition({ height: '240px'});
    this.$('.sign-in-username-form').removeClass('invisible');
    this.$('.sign-in-password-form').addClass('invisible');
    $('.sign-in-text-box').focus();
  },

  tryAgain: function() {
    alert("Sorry, Maildog doesn't recognize that email.");
  }
});
