Maildog.Views.EmailListItem = Backbone.View.extend({
  template: JST['emailListItem'],
  tagName: "li",
  className: "email-list-item group",

  initialize: function(options) {
    this.folder = options.folder;
  },

  events: {
    "click .star": "starClick",
    "click .check-box": "checkBoxClick",
    "click .email-list-item-div": "showDraft"
  },

  render: function() {
    var correspondent = this.model.tail().correspondentString(this.folder);

    var content = this.template({
      thread: this.model,
      email: this.model.  tail(),
      correspondent: correspondent
    });

    this.$el.html(content);
    if (this.folder === "drafts") { this.swapLinkForDiv(); }
    // this.$el.attr('data-id', this.model.id);
    // if (this.model.get('checked')) {
    //   this.$el.addClass("checked-list-item");
    // }

    return this;
  },

  // starClick: function(e) {
  //   e.preventDefault();
  //   $(e.currentTarget).toggleClass('star-on');
  //   if (this.model.get('starred')) {
  //     this.model.set('starred', false)
  //   } else {
  //     this.model.set('starred', true)
  //   }
  //
  //   this.model.save({}, {
  //     error: function() {
  //       alert('error')
  //     }
  //   })
  // },
  //
  // checkBoxClick: function(e) {
  //   this.$('.check-box-container').toggleClass('checked');
  //   this.$el.toggleClass("checked-list-item");
  //   $(e.currentTarget).toggleClass("checked-check-box");
  //   if (this.model.get('checked')) {
  //     this.model.set('checked', false)
  //   } else {
  //     this.model.set('checked', true)
  //   }
  //
  //   this.model.save({}, {
  //     error: function() {
  //       alert('error')
  //     }
  //   })
  // },

  swapLinkForDiv: function() {
    var $a = this.$("a");
    $div = $("<div>");
    $div.addClass('email-list-item-div');
    $div.append($a.children());
    $a.replaceWith($div);
  },

  // showDraft: function() {
  //   Maildog.router.removeFlashes();
  //   var thread = new Maildog.Collections.EmailThreads([], { id: this.model.id });
  //   thread.fetch({
  //     reset: true,
  //     success: function() {
  //       if (thread.length === 1) {
  //         var view = new Maildog.Views.ComposeEmailBox({
  //           email: thread.at(0)
  //         });
  //         Maildog.mainFolders.addSubview('.compose-email-popup-container', view);
  //         $('.compose-email-body').focus();
  //       } else {
  //         Backbone.history.navigate("/emails/" + this.model.id, { trigger: true });
  //       }
  //     }.bind(this),
  //     error: function() {
  //       alert("error")
  //     }
  //   });
  // }
});
