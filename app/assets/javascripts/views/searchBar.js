Maildog.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['searchBar'],
  className: 'search-bar',

  events: {
    "click #search-button": "search",
    "input": "enterOn"
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
    this.listeningToEnter = false;
  },

  enterOn: function(e) {
    if (this.listeningToEnter) { return; }
    this.listeningToEnter = true;

    this.$el.keydown(function(e) {
      if (e.which !== 13) { return; }
      this.search(e);
    }.bind(this));
  },

  clearSearchBox: function() {
    this.$('.query').val("");
  }
});
