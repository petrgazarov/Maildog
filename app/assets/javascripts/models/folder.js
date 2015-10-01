Maildog.Models.Folder = Backbone.Model.extend({
  urlRoot: "/api/folders",

  toJSON: function(){
    var json = { folder: _.clone(this.attributes) };
    return json;
  }
});
