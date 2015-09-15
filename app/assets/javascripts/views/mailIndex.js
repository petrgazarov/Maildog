Maildog.Views.MailIndex = Backbone.CompositeView.extend({
  template: JST['mailIndex'],

  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template());

    // this.initializeSearchBarView();
    // this.initializeCurrentUserView();
    // this.initializePagesMenuView();
    // this.initializeEmailOptionsView();
    // this.initializeEmailNavigationView();
    // this.initializeEmailFolderView();
    // debugger
    [ Maildog.Views.SearchBar,
      Maildog.Views.CurrentUser,
      Maildog.Views.PagesMenu,
      Maildog.Views.EmailOptions,
      Maildog.Views.EmailNavigation,
      Maildog.Views.EmailFolders ].forEach(function(view) {
        this.initializeView(view);
      }.bind(this))

    // this.$('#mail-index-content').html(this.$el);
    return this;
  },

  initializeView: function(view) {
    // debugger
    var initializedView = new view();
    this.$('#mail-index-content').append(initializedView.render().$el)
    // this.addSubview(this.$el, initializedView);
  },

  initializeCurrentUserView: function() {
    var view = new Maildog.Views.CurrentUser();
    this.$el.append(view.render().$el);
  },

  initializePagesMenuView: function() {
    var view = new Maildog.Views.PagesMenu();
    this.$el.append(view.render().$el);
  },

  initializeEmailOptionsView: function() {
    var view = new Maildog.Views.EmailOptions();
    this.$el.append(view.render().$el);
  },

  initializeEmailNavigationView: function() {
    var view = new Maildog.Views.EmailNavigation();
    this.$el.append(view.render().$el);
  },

  initializeEmailFolderView: function() {
    var view = new Maildog.Views.EmailFolder();
    this.$el.append(view.render().$el);
  }
});
