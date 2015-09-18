Maildog.Views.EmailList = Backbone.CompositeView.extend({
  template: JST['emailList'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSubviewForEmail);
    this.collection.forEach(this.addSubviewForEmail.bind(this));
  },

  render: function() {
    this.$el.html(this.template())
    this.attachSubviews();
    return this;
  },

  addSubviewForEmail: function(email) {
    var subview = new Maildog.Views.EmailListItem({ model: email });
    this.addSubview(".email-list", subview);
  }
});
