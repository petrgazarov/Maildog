Maildog.Views.EmailListItem = Backbone.View.extend({
  template: JST['emailListItem'],
  tagName: "li",
  className: "email-list-item group",

  initialize: function(options) {
    this.folder = options.folder;
    this.events = {};
  },

  events: {
    "mouseenter .star": "hoverStar"
  },

  render: function() {
    var correspondent = this.model.correspondentString(this.folder);
    var content = this.template({
      email: this.model,
      correspondent: correspondent
    });

    this.$el.html(content);
    if (this.folder === "drafts") { this.swapLinkForDiv(); }
    this.$el.attr('data-id', this.model.id);

    return this;
  },

  hoverStar: function() {
    debugger
    this.$('.star').removeClass("star-off").addClass('star-on');
  },

  swapLinkForDiv: function() {
    var $a = this.$("a");
    $div = $("<div>");
    $div.addClass($a.attr('class'))
    $div.append($a.children());
    $a.replaceWith($div);
    this.events["click"] = "showDraft";
    this.delegateEvents();
  },

  showDraft: function() {
    var thread = new Maildog.Collections.EmailThreads([], { id: this.model.id });
    thread.fetch({
      reset: true,
      success: function() {
        if (thread.length === 1) {
          var view = new Maildog.Views.ComposeEmailBox({
            email: thread.at(0)
          });
          Maildog.emailFolders.addSubview('.compose-email-popup-container', view);
          $('.compose-email-body').focus();
        } else {
          Backbone.history.navigate("/emails/" + this.model.id, { trigger: true });
        }
      }.bind(this),
      error: function() {
        alert("error")
      }
    });
  }
});
