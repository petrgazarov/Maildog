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

  // signInGuest: function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: "session/create_guest",
  //     type: "POST",
  //     success: function() {
  //       Backbone.history.navigate("", { trigger: true })
  //     }
  //   })
  // },

  shiftToAuth: function() {
    // this.$('button').removeClass('sign-in-next-button')
    //                 .addClass('sign-in-submit-button');
    // this.$('button').text('Sign in');
    // this.$('.sign-in-text-box').attr("name", 'user[password]');
    // this.$('.sign-in-text-box').attr("type", 'password');
    // this.$('.sign-in-text-box').attr("placeholder", 'Password');
    this.$('.sign-in-text-box').val("");
    this.$('.sign-in-username-form').addClass('invisible');
    this.$('.sign-in-password-form').removeClass('invisible');
    $('.sign-in-text-box').focus();
  },

  tryAgain: function() {
    alert("Sorry, Maildog doesn't recognize that email.");
  }
});
