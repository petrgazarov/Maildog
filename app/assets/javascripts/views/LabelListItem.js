Maildog.Views.LabelListItem = Backbone.View.extend({
  template: JST['labelListItem'],
  tagName: "li",

  events: {
    "click #delete-label-cross": "deleteLabel",
    "click": "loadLabel"
  },

  render: function() {
    var content = this.template({ label: this.model });
    this.$el.html(content);
    return this;
  },

  deleteLabel: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.remove();
  },

  loadLabel: function(e) {
    if ($(e.target).attr('id') === "delete-label-cross") { return; }

    Backbone.history.navigate("labels/" + this.model.id, { trigger: true });
  }
});
