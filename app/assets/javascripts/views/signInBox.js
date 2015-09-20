Maildog.Views.SignInBox = Backbone.View.extend({
  tagName: "form",

  events: {
    "submit": "transitionOut"
  },

  templateUser: JST['signInUser'],
  templateAuth: JST['signInPassword'],

  render: function() {
    var content = this.templateUser({ user: Maildog.currentUser });
    this.$el.html(content);
    return this;
  },

  shiftToAuth: function() {
    this.$('button').removeClass('.sign-in-next-button')
                    .addClass('.sign-in-submit-button');
  },

  tryAgain: function() {
    alert("Sorry, Maildog doesn't recognize that email.");
  },

  transitionOut: function(e) {
    e.preventDefault();
  }
});
