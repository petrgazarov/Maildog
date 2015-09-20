Maildog.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['signIn'],

  events: {
    "click .sign-in-next-button": "fetchUser"
  },

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Maildog.currentUser, "signIn", this.callback);
    this.$signInUser = new Maildog.Views.SignInBox({ viewOption: "user" });
    this.addSubview(".sign-in-box", this.$signInUser)
  },

  render: function(){
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  fetchUser: function(e) {
    e.preventDefault();
    var formData = this.$('.sign-in-box form').serializeJSON().user;
    debugger

    Maildog.currentUser.fetchUser(formData)
  },

  submit: function(e){
    e.preventDefault();

    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON().user;

    Maildog.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },
});
