window.Maildog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Maildog.emails = new Maildog.Collections.Emails();
    Maildog.currentUser = new Maildog.Models.CurrentUser();
    var view = new Maildog.Views.MailIndex();
    $("#mail-index").html(view.render().$el);
    new Maildog.Routers.Router({ $rootEl: $('.email-show-container') });
    Backbone.history.start();
    Backbone.history.navigate("inbox", { trigger: true })
  }
};

$(function() {
  Maildog.initialize();
})
