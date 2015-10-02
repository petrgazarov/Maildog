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
    Maildog.router.currentEmailThread.models.forEach(function(email) {
      var emailLabel = new Maildog.Models.EmailLabel({
        label_id: this.model.id,
        email_id: email.id
      });
      emailLabel.save({}, {
        success: function() {
          Maildog.router.addFlash(
            "The conversation has been added to " + this.model.get('name')
          )
        }.bind(this)
      });
    }.bind(this));
  }
});
