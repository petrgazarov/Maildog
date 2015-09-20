Maildog.Views.EmailOptions = Backbone.View.extend({
  template_list: JST['emailOptionsList'],
  template_show: JST['emailOptionsShow'],

  // initialize: function() {
  //   this.listenTo(
  //     Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
  //   );
  //   this.listenTo(Maildog.router, "folderLinkClick", this.render);
  // },

  events: {
    "click .delete-email-thread": "fireDeleteThread"
  },

  render: function(state, email) {
    var content;
    if (typeof state === "undefined") {
      content = this.template_list();
    }
    else if (state === "show") {
      content = this.template_show({ email: email })
    };

    this.$el.html(content);
    return this;
  },

  fireDeleteThread: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("deleteThread");
  },
});
