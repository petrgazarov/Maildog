Maildog.Views.EmailOptionsLabelListItem = Backbone.View.extend({
  template: JST['emailOptionsLabelListItem'],
  tagName: "li",

  events: {
    "click": "labelAs"
  },

  render: function() {
    var content = this.template({ label: this.model });
    this.$el.html(content);
    return this;
  },

  labelAs: function() {
    var emailLabel = new Maildog.Models.ThreadLabel({
      label_id: this.model.id,
      thread_id: Maildog.router.currentEmailThread.id
    });

    emailLabel.save({}, {
      success: function() {
        Maildog.router.addFlash(
          "The conversation has been added to " + this.model.get('name')
        )
      }.bind(this)
    });
  }
});
