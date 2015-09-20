Maildog.Views.SignInBox = Backbone.View.extend({
  tagName: "form",

  events: {
    "submit": "transitionOut"
  },

  templateUser: JST['signInUser'],
  templateAuth: JST['signInPassword'],

  render: function() {
    var content = this.templateUser();
    this.$el.html(content);
    return this;
  },

  switchToAuth: function() {
    var content = this.templateAuth({ user: Maildog.currentUser })
    this.$el.html(content);
  },

  tryAgain: function() {
    alert("Sorry, Maildog doesn't recognize that email.");
  },

  transitionOut: function(e) {
    e.preventDefault();
  }
});
