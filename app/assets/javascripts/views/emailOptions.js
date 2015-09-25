Maildog.Views.EmailOptions = Backbone.View.extend({
  template_list: JST['emailOptionsList'],
  template_show: JST['emailOptionsShow'],

  initialize: function() {
    this.listenTo(
      Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
    );
    this.listenTo(Maildog.router, "folderNavigation", function(state, email) {
      this.model = email;
      this.render(state);
      this.backButtonValue = state;
    });
  },

  events: {
    "click #delete-email-thread": "fireDeleteThread",
    "click #email-show-back-button": "goBack",
    "click #refresh-button": "refreshCollection"
  },

  render: function(state, email) {
    var template = (state === "show" ? this.template_show : this.template_list);

    this.$el.html(template());
    return this;
  },

  fireDeleteThread: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("deleteThread");
  },

  goBack: function(e) {
    e.preventDefault();
    Backbone.history.navigate(this.backButtonValue, { trigger: true });
  },

  refreshCollection: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("refreshCollection");
  }
});
