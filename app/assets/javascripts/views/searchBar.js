Maildog.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['searchBar'],
  className: 'search-bar',

  events: {
    "click #search-button": "search"
  },

  initialize: function() {
    this.listenTo(Maildog.router, "clearSearchBox", this.clearSearchBox)
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  search: function (e) {
    e.preventDefault();
    Backbone.history.navigate(
      "search/" + this.$('.query').val(),
      { trigger: true }
    );
  },

  clearSearchBox: function() {
    this.$('.query').val("");
  }
});
