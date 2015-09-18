Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend({
  template: JST['composeEmailBox'],
  tagName: 'form',
  className: 'compose-email-popup',

  events: {
    "submit": "sendEmail",
    "click .cancel-compose-box-popup": "removeView"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  sendEmail: function(e) {
    e.preventDefault();
    var formData = this.$el.serializeJSON();
    var email = new Maildog.Models.Email()
    this.remove();

    email.save(formData.email, {
      success: function() {
        Backbone.history.navigate("#", { trigger: true })
      }.bind(this)
    })
  },

  removeView: function() {
    this.remove();
  }
});
