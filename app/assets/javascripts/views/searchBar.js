Maildog.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['searchBar'],
  className: 'search-bar',


  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
