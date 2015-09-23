Maildog.Models.User = Backbone.Model.extend({
  urlRoot: "/api/user",

  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  }
});
