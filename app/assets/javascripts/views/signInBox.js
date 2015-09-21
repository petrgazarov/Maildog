Maildog.Views.SignInBox = Backbone.View.extend({
  tagName: "form",
  template: JST['signInBox'],

  render: function() {
    var content = this.template({ user: Maildog.currentUser });
    this.$el.html(content);
    return this;
  },

  signInGuest: function(e) {
    e.preventDefault();
    $.ajax({
      url: "session/create_guest",
      type: "POST",
      success: function() {
        Backbone.history.navigate("", { trigger: true })
      }
    })
  },

  shiftToAuth: function() {
    this.$('button').removeClass('sign-in-next-button')
                    .addClass('sign-in-submit-button');
    this.$('button').text('Sign in');
    this.$('.sign-in-text-box').val("");
    this.$('.sign-in-text-box').attr("name", 'user[password]');
    this.$('.sign-in-text-box').attr("type", 'password');
    this.$('.sign-in-text-box').attr("placeholder", 'Password');
  },

  tryAgain: function() {
    alert("Sorry, Maildog doesn't recognize that email.");
  }
});
