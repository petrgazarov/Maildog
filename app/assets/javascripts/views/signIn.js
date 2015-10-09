Maildog.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['signIn'],

  events: {
    "click .back-arrow": "toggleLinks",
    "click .sign-in-as-different": "backToUsername",
    "click .sign-in-next-button": function(e) {
       this.fetchUser(e);
       this.toggleLinks(e);
     }
  },

  initialize: function(){
    Maildog.currentUser = new Maildog.Models.CurrentUser();
    this.signInBox = new Maildog.Views.SignInBox();
    this.addSubview(".sign-in-box", this.signInBox);
  },

  render: function(){
    this.$el.html(this.template());
    this.attachSubviews();
    $('.sign-in-text-box').focus();
    return this;
  },

  fetchUser: function(e) {
    e.preventDefault();
    var formData = this.$('.sign-in-username-form').serializeJSON().user;
    Maildog.currentUser.set("username", "");

    Maildog.currentUser.fetchUser({
      username: formData.username,
      success: function() {
        if (Maildog.currentUser.get('username')) {
          this._shiftToAuth()
        } else {
          this._tryAgain()
        }
      }.bind(this)
    })
  },

  toggleLinks: function(e) {
    e.preventDefault();
    this.$('.sign-in-as-different').toggleClass('invisible');
    this.$('.create-account-link').toggleClass('invisible');
  },

  backToUsername: function(e) {
    this.signInBox.back(e, "");
    this.toggleLinks(e);
  },

  _shiftToAuth: function() {
    this.signInBox.shiftToAuth();
    $('.password-text-box').focus();
  },

  _tryAgain: function() {
    this.signInBox.tryAgain();
  }
});
