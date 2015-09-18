Maildog.Views.MailNav = Backbone.CompositeView.extend({
  template: JST['mailIndex'],

  initialize: function() {
    this.listenTo(
      Maildog.router, "showEmailMessageOptions", this.changeEmailOptions
    )
  },

  render: function() {
    this.$el.html(this.template());
    this._initializeSubviews();
    return this;
  },

  _initializeSubviews: function() {
    [ Maildog.Views.SearchBar,
      Maildog.Views.CurrentUser ].forEach(function(view) {
        this.addSubview(this.$('.mail-header'), new view());
      }.bind(this));

    this.addSubview(this.$('.pages-menu'), new Maildog.Views.PagesMenu());
    this.addSubview(
      this.$('.email-options'), new Maildog.Views.EmailOptions()
    );
    this.addSubview(
      this.$('.email-navigation'), new Maildog.Views.EmailNavigation()
    );
  },

  changeEmailOptions: function(email) {
    alert("here")

  }
});
