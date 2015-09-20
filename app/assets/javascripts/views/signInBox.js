Maildog.Views.SignInBox = Backbone.View.extend({
  tagName: "form",

  initialize: function(options) {
    this.viewOption = options.viewOption;
  },

  events: {
    "submit": "transitionOut"
  },

  template: function() {
    if (this.viewOption = "user") {
      return JST['signInUser'];
    }
    else {
      return JST['signInPassword'];
    }
  },

  render: function() {
    var content;
    if (this.viewOption = "user") {
      content = JST['signInUser']();
    }
    else {
      template = JST['signInPassword']({ user: Maildog.currentUser });
    }
    this.$el.html(content);
    return this;
  },

  transitionOut: function(e) {
    e.preventDefault();
    alert("transitionOut")
  }
});
