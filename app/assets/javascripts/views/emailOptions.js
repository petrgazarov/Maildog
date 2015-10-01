Maildog.Views.EmailOptions = Backbone.CompositeView.extend({
  template_list: JST['emailOptionsList'],
  template_show: JST['emailOptionsShow'],

  initialize: function() {
    this.listenTo(
      Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
    );
    this.listenTo(Maildog.router, "folderNavigation", function(state, email) {
      this.model = email;
      this.render(state);
      this.backButtonValue = state;
    });

    this.folderCollection = new Maildog.Collections.Folders();
    this.folderCollection.fetch();
  },

  events: {
    "click #delete-email-thread": "fireDeleteThread",
    "click #email-show-back-button": "goBack",
    "click #refresh-button": "refreshCollection",
    "click .move-to-button-container": "showFolderList"
  },

  render: function(state, email) {
    var template = (state === "show" ? this.template_show : this.template_list);

    this.$el.html(template());
    return this;
  },

  fireDeleteThread: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("deleteThread");
  },

  goBack: function(e) {
    e.preventDefault();
    Backbone.history.navigate(this.backButtonValue, { trigger: true });
  },

  showFolderList: function() {
    this.$('.email-options-folder-list').removeClass('invisible');
    this.folderCollection.forEach(this.addSubviewforFolder.bind(this));
  },

  addSubviewforFolder: function(folder) {
    var subview = new Maildog.Views.EmailOptionsFolderListItem({
      model: folder
    });
    this.addSubview('.email-options-folder-list', subview);
  },

  refreshCollection: function(e) {
    e.preventDefault();
    Maildog.router.removeFlashes();
    Backbone.pubSub.trigger("refreshCollection");
  }
});
