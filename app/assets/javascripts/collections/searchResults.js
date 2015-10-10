Maildog.Collections.SearchResults = Backbone.Collection.extend({
	url: "/api/search",

	parse: function (resp) {
		if (resp.total_count) {
			this.total_count = resp.total_count;
		}

		return resp.results;
	},

	comparator: function(thread) {
		return [thread.tail().get('date'), thread.tail().get('time')]
	},

	model: function (attrs) {
		var type = attrs._type;
		delete attrs._type;

		var model = new Maildog.Models[type]();
    model.set(model.parse(attrs));
    return model;
	},

  folderName: function() {
    return "Search"
  },

	noConversationsMemo: function() {
    return "No messages matched your search."
  }
});
