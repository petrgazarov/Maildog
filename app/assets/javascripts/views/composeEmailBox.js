Maildog.Views.ComposeEmailBox = Backbone.CompositeView.extend({
  template: JST['composeEmailBox'],
  tagName: 'form',

  events: {
    "submit": "sendEmail"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  sendEmail: function(e) {
    e.preventDefault();
    var formData = this.$el.serializeJSON();
    var email = new Maildog.Models.Email()

    email.save(formData.email, {
      success: function() {
        Maildog.emails.add(email);
        this.remove();
        Backbone.history.navigate("#", { trigger: true })
      }.bind(this)
    })
  }
});
