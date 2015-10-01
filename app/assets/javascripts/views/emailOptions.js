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
    if (!this.$('.email-options-folder-list').hasClass('invisible')) { return; }

    window.setTimeout(function() {
      $('html').click(function(e) {
        this.hideFolderList(e);
      }.bind(this))
    }.bind(this), 0);

    this.$('.icon-move-to-button').css('opacity', 1);
    this.$('.down-arrow-symbol').css('opacity', 1);
    this.$('.email-options-folder-list').removeClass('invisible');
    this.folderCollection.forEach(this.addSubviewforFolder.bind(this));
  },

  hideFolderList: function(e) {
    if (
         $(e.target).parents().filter('.email-options-folder-list').length > 0 ||
         $(e.target).hasClass('email-options-folder-list')
        ) {
      return;
    }

    this.$('.email-options-folder-list').addClass('invisible');
    this.$('.icon-move-to-button').css('opacity', .55);
    this.$('.down-arrow-symbol').css('opacity', .55);

    this.subviews('.email-options-folder-list').forEach(function(subview) {
      this.removeSubview('.email-options-folder-list', subview);
    }.bind(this));
    $('html').off('click');
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
