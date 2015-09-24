Maildog.Views.EmailListItem = Backbone.View.extend({
  template: JST['emailListItem'],
  tagName: "li",
  className: "email-list-item group",

  initialize: function(options) {
    this.folder = options.folder;
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

  swapLinkForDiv: function() {
    var $a = this.$("a");
    $div = $("<div>");
    $div.addClass($a.attr('class'))
    $div.append($a.children());
    $a.replaceWith($div);
  }
});
