Maildog.Views.SignInBox = Backbone.View.extend({
  tagName: "form",

  initialize: function(options) {
    this.viewOption = options.viewOption;
  },

  events: {
    "submit": "transitionOut"
  },

  templateUser: JST['signInUser'],
  templateAuth: JST['signInPassword'],

  render: function() {
    var content;
    if (this.viewOption = "user") {
      content = this.templateUser();
    }
    else {
      content = this.templateAuth({ user: Maildog.currentUser });
    }
    this.$el.html(content);
    return this;
  },

  transitionOut: function(e) {
    e.preventDefault();
  }
});
