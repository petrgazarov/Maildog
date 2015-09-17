Maildog.Views.ShowEmailThread - Backbone.CompositeView.extend({
  template: JST['showEmailThread'],

  render: function() {
    this.$el.html(this.template());
    // model is email thread which represents an array of connected emails
    this.model.forEach(function(emailMessage) {
      var view;
    })
  }
});
