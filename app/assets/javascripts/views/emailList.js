Maildog.Views.EmailList = Backbone.CompositeView.extend({
  template: JST['emailList'],

  initialize: function(options) {
    this.folder = options.folder;
    this.refreshCollection();
    this.listenTo(this.collection, 'reset', this.render);
    Backbone.pubSub.on("refreshCollection", this.refreshCollection, this);
  },

  render: function() {
    this.$('.email-list-empty-folder-memo').text("");
    this.eachSubview(function(subview) { subview.remove() });
    this.$el.html(this.template());
    this.collection.forEach(this.addSubviewForEmail.bind(this));
    return this;
  },

  addSubviewForEmail: function(email) {
    var subview = new Maildog.Views.EmailListItem({
      model: email,
      folder: this.folder
    });
    this.addSubview(".email-list", subview);
  },

  refreshCollection: function() {
    if (this.collection.folderName() === "Search") {
      this.collection.fetch({
  			reset: true,
        data: {
  				query: this.collection.query,
  				page: 1
  			}
  		});
    } else {
      this.collection.fetch({
        reset: true,
        success: function() {
          this.insertNoConversationsMemo();
        }.bind(this)
      });
    }
  },

  insertNoConversationsMemo: function() {
    if (this.collection.length === 0) {
      this.$('.email-list-empty-folder-memo')
          .text("No conversations in " + this.collection.folderName());
    }
  }
});
