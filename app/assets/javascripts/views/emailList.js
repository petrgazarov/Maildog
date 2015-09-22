Maildog.Views.EmailList = Backbone.CompositeView.extend({
  template: JST['emailList'],

  initialize: function(options) {
    this.folder = options.folder;
    this.listenTo(this.collection, 'reset', this.render);
    Backbone.pubSub.on("refreshCollection", this.refreshCollection, this);
  },

  render: function() {
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
    this.collection.fetch({ reset: true });
  }
});
