Maildog.Views.EmailOptions = Backbone.View.extend({
  template_list: JST['emailOptionsList'],
  template_show: JST['emailOptionsShow'],

  // initialize: function() {
  //   debugger
    // this.listenTo(
    //   Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
    // );
    // this.listenTo(Maildog.router, "folderLinkClick", function(state, email) {
    //   this.render(state, email);
    //   this.backButtonValue = state;
    // });
  // },

  events: {
    "click .delete-email-thread": "fireDeleteThread",
    "click .email-show-back-button": "goBack",
    "click .refresh-button": "refreshCollection"
  },

  render: function(state, email) {
    var content;
    if (state === "show") {
      content = this.template_show({ email: email })
    }
    else {
      content = this.template_list();
    }

    this.$el.html(content);
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
