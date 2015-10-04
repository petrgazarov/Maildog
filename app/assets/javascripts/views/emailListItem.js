Maildog.Views.EmailListItem = Backbone.View.extend({
  template: JST['emailListItem'],
  tagName: "li",
  className: "email-list-item group",

  initialize: function(options) {
    this.folder = options.folder;
    this.thread = options.thread;
    this.email = this.thread.tail();
  },

  events: {
    "click .star": "starClick",
    "click .check-box": "checkBoxClick",
    "click .email-list-item-div": "showDraft"
  },

  render: function() {
    var correspondent = this.thread.tail().correspondentString(this.folder);
    var content = this.template({
      thread: this.thread,
      tail: this.email,
      correspondent: correspondent
    });

    this.$el.html(content);
    if (this.folder === "drafts") { this.swapLinkForDiv(); }
    if (this.thread.get('checked')) {
      this.$el.addClass("checked-list-item");
    }

    return this;
  },

  starClick: function(e) {
    e.preventDefault();
    $(e.currentTarget).toggleClass('star-on');
    if (this.email.get('starred')) {
      this.email.set('starred', false)
    } else {
      this.email.set('starred', true)
    }

    this.email.save({}, {
      error: function() {
        alert('error')
      }
    })
  },

  checkBoxClick: function(e) {
    this.$('.check-box-container').toggleClass('checked');
    this.$el.toggleClass("checked-list-item");
    $(e.currentTarget).toggleClass("checked-check-box");
    if (this.thread.get('checked')) {
      this.thread.set('checked', false)
    } else {
      this.thread.set('checked', true)
    }

    this.thread.save({}, {
      error: function() {
        alert('error')
      }
    })
  },

  swapLinkForDiv: function() {
    var $a = this.$("a");
    $div = $("<div>");
    $div.addClass('email-list-item-div');
    $div.append($a.children());
    $a.replaceWith($div);
  },

  showDraft: function() {
    Maildog.router.removeFlashes();
    var thread = new Maildog.Models.Thread({ id: this.thread.id });
    thread.fetch({
      success: function() {
        if (thread.emails().length === 1) {
          var view = new Maildog.Views.ComposeEmailBox({
            email: thread.emails().at(0)
          });
          Maildog.mainFolders.addSubview('.compose-email-popup-container', view);
          $('.compose-email-body').focus();
        } else {
          Backbone.history.navigate("/threads/" + this.thread.id, { trigger: true });
        }
      }.bind(this),
      error: function() {
        alert("error")
      }
    });
  }
});
