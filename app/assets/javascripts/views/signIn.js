Maildog.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['signIn'],

  events: {
    // "click":
  },

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Maildog.currentUser, "signIn", this.callback);
    var subview = new Maildog.Views.SignInBox({ viewOption: "user"});
    this.addSubview(".sign-in-box", subview)
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
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
