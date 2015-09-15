window.Maildog = {
  Models {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Maildog.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

$(function() {
  new Maildog();
})
