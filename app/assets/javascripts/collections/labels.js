Maildog.Collections.Labels = Backbone.Collection.extend({
  model: Maildog.Models.Label,

  initialize: function(models, options) {
    this.url = (options && options.url) ? options.url : "api/labels"
  }
});
