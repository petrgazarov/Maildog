Maildog.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['signIn'],

  events: {
    "click .sign-in-next-button": "fetchUser"
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

  _shiftToAuth: function() {
    this.signInBox.shiftToAuth();
    $('.password-text-box').focus();
  },

  _tryAgain: function() {
    this.signInBox.tryAgain();
  }
});
