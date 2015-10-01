Maildog.Collections.Labels = Backbone.Collection.extend({
  url: "/api/labels",

  model: Maildog.Models.Label
});
