Maildog.Models.EmailLabel = Backbone.Model.extend({
  urlRoot: "api/email_labels",

  toJSON: function(){
    var json = { email_label: _.clone(this.attributes) };
    return json;
  }
});
