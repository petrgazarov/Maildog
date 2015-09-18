Maildog.Views.ShowEmailThread = Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  initialize: function() {
    // this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this._addSubviewToEmail);

    this.collection.forEach(this._addSubviewToEmail.bind(this))
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  _addSubviewToEmail: function(email) {
    var subview = new Maildog.Views.EmailShow({
      model: email,
      collection: this.collection
    });
    this.addSubview(".email-thread-list", subview);
  }
});
