Maildog.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['signIn'],

  events: {
    "click .back-arrow": "toggleLinks",
    "click .sign-in-as-different": "backToUsername",
    "submit .sign-in-password-form": "submit",
    "focusin .sign-in-text-box": "removeErrorMessages",
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

  submit: function(e) {
    e.preventDefault();
    this.removeErrorMessages();

    this.$('button').prop("disabled", true);
    var formData = $(e.target).serializeJSON();

    $.ajax({
      url: "/api/session",
      method: "post",
      data: formData,
      dataType: "json",
      success: function() {
        window.location = window.location.origin;
      },
      error: function(model, response) {
        $('.sign-in-text-box').addClass('error-input');
        this.addErrorMessage('.sign-in-password-form',
          "The email and password you entered don't match.");

        this.$('.sign-in-password-form > input.sign-in-text-box')
                                              .val("").focusout();
        this.$('button').prop("disabled", false);
      }.bind(this)
    })
  },

  toggleLinks: function(e) {
    e.preventDefault();
    this.$('.sign-in-as-different').toggleClass('invisible');
    this.$('.create-account-link').toggleClass('invisible');
  },

  removeErrorMessages: function() {
    this.$('.form-error-message').remove();
    this.$('.error-input').removeClass('error-input');
  },

  addErrorMessage: function(selector, message) {
    $errorMessage = $(
      "<div>" + message + "</div>"
    ).addClass('form-error-message');

    this.$(selector + ' > input:nth-of-type(1)').after($errorMessage);
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
