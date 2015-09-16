Maildog.Views.MailIndex = Backbone.CompositeView.extend({
  template: JST['mailIndex'],

  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template());

    [ Maildog.Views.SearchBar,
      Maildog.Views.CurrentUser,
      Maildog.Views.PagesMenu,
      Maildog.Views.EmailOptions,
      Maildog.Views.EmailNavigation,
      Maildog.Views.EmailFolders ].forEach(function(view) {
        this.initializeView(view);
      }.bind(this))

    return this;
  },

  initializeView: function(view) {
    // debugger
    var initializedView = new view();
    this.$('#mail-index-content').append(initializedView.render().$el)
    // this.addSubview(this.$el, initializedView);
  }
});
