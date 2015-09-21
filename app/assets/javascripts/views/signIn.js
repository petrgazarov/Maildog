Maildog.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['signIn'],

  events: {
    "click .sign-in-next-button": "fetchUser",
    "click .sign-in-submit-button": "submit"
  },

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Maildog.currentUser, "signIn", this.signInCallback);
    this.listenTo(Maildog.currentUser, "sync", this.styleSignIn);
    this.$signInBox = new Maildog.Views.SignInBox();
    this.addSubview(".sign-in-box", this.$signInBox)
  },

  render: function(){
    this.$el.html(this.template());
    this.attachSubview(".sign-in-box", this.$signInBox);
    $.rails.refreshCSRFTokens();
    return this;
  },

  signInCallback: function() {

    $('.sign-in-view').removeClass('sign-in-view').addClass('show-container');
    Maildog.router.initializeForSignedIn();

    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  styleSignIn: function() {
    $('.show-container').removeClass('show-container').addClass('sign-in-view');
    $('.sign-in-text-box').focus();
  },

  fetchUser: function(e) {
    e.preventDefault();
    var formData = this.$('.sign-in-box form').serializeJSON().user;

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

  submit: function(e){
    e.preventDefault();
    var formData = this.$('.sign-in-box form').serializeJSON().user;
    Maildog.currentUser.signIn({
      username: Maildog.currentUser.get('username'),
      password: formData.password,
      error: function() {
        alert("The email and password you entered don't match.");
      }
    });
  },

  _shiftToAuth: function() {
    this.$signInBox.shiftToAuth();
    $('.password-text-box').focus();
  },

  _tryAgain: function() {
    this.$signInBox.tryAgain();
  }
});
