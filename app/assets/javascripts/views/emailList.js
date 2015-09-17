Maildog.Views.EmailList = Backbone.CompositeView.extend({
  template: JST['emailList'],

  initialize: function() {
    debugger
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSubviewForEmail);
    this.collection.forEach(this.addSubviewForEmail);
  },

  render: function() {
    this.$el.html(this.template())
    this.attachSubviews();
    return this;
  },

  addSubviewForEmail: function(email) {
    debugger
    var subview = new Maildog.Views.EmailListItem({ model: email });
    this.addSubview(".email-list", subview);
  }
});
