Maildog.Views.SignInBox = Backbone.View.extend({
  template: JST['signInBox'],

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
    $('.canvas-blue').transition({ height: '100px', width: '100px' }, 'fast');
    this.$('.sign-in-text-box').val("");
    this.$('.sign-in-username-form').addClass('invisible');
    this.$('.sign-in-password-form').removeClass('invisible');
    $('.sign-in-text-box').focus();
  },

  tryAgain: function() {
    alert("Sorry, Maildog doesn't recognize that email.");
  }
});
