Maildog.Models.ThreadLabel = Backbone.Model.extend({
  urlRoot: "api/thread_labels",

  toJSON: function(){
    var json = { thread_label: _.clone(this.attributes) };
    return json;
  }
});
