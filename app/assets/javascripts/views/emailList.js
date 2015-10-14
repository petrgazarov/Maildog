Maildog.Views.EmailList = Backbone.CompositeView.extend({
  template: JST['emailList'],

  events: {
    "click .check-box": "checkBox"
  },

  initialize: function(options) {
    this.checkedThreads = [];
    this.folder = options.folder;
    this.refreshCollection();
    this.listenTo(this.collection, 'reset', this.render);
    this._setupRefreshCollectionListener();
  },

  render: function() {
    this.$('.email-list-empty-folder-memo').text("");
    this.eachSubview(function(subview) { subview.remove() });
    this.$el.html(this.template());
    this.collection.sort();

    this.checkedThreads = this._extractCheckedThreads();
    this.collection.forEach(this.addSubviewForThread.bind(this));
    return this;
  },

  addSubviewForThread: function(thread) {
    var subview = new Maildog.Views.EmailListItem({
      thread: thread,
      folder: this.folder
    });
    this.addSubview(".email-list", subview);
  },

  refreshCollection: function(options) {
    if (this.collection.folderName() === "Search") {
      this.collection.fetch({
  			reset: true,
        data: {
  				query: this.collection.query,
  				page: 1
  			},
        success: function() {
          this.insertNoConversationsMemo();
          options && options.success && options.success();
        }.bind(this)
  		});
    }
    else {
      this.collection.fetch({
        reset: true,
        success: function() {
          this.insertNoConversationsMemo();
          options && options.success && options.success();
        }.bind(this)
      });
    }
  },

  checkBox: function(e) {
    e.preventDefault();

    var id = $(e.target).data('thread-id');

    if ($(e.target).hasClass('checked-check-box')) {
      this.checkedThreads.push(id);
    }
    else {
      var index = this.checkedThreads.indexOf(id);
      this.checkedThreads.splice(index, 1);
    }

    Backbone.pubSub.trigger('checkBox', this.checkedThreads);
  },

  insertNoConversationsMemo: function() {
    if (this.collection.length === 0) {
      this.$('.email-list-empty-folder-memo')
        .text(this.collection.noConversationsMemo());
    }
  },

  _extractCheckedThreads: function() {
    var checkedThreads = [];

    this.collection.forEach(function(thread) {
      if (thread.get('checked')) {
        checkedThreads.push(thread.id);
      }
    });
    if (checkedThreads.length > 0) {
      Backbone.pubSub.trigger('checkBox', checkedThreads);
    }

    return checkedThreads;
  },

  _setupRefreshCollectionListener: function() {
    Backbone.pubSub.on("refreshCollection", function() {
      this.refreshCollection({ success: function() {
        Maildog.router.addFlash("Loading...");
        window.setTimeout(function() {
          Maildog.router.removeFlashes();
        }, 85);
      }})
    }.bind(this));
  }
});
