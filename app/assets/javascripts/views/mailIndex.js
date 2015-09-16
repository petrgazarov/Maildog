Maildog.Views.MailIndex = Backbone.CompositeView.extend({
  template: JST['mailIndex'],

  initialize: function() {
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

    [ Maildog.Views.PagesMenu,
      Maildog.Views.EmailOptions,
      Maildog.Views.EmailNavigation ].forEach(function(view) {
        this.addSubview(this.$('.mail-nav'), new view());
      }.bind(this))

    this.addSubview(
      this.$('#mail-index-content'),
      new Maildog.Views.EmailFolders()
    );
  }
});
