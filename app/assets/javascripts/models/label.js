Maildog.Models.Label = Backbone.Model.extend({
  urlRoot: "/api/labels",

  toJSON: function(){
    var json = { label: _.clone(this.attributes) };
    return json;
  }
});
