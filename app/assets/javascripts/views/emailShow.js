Maildog.Views.EmailShow = Backbone.CompositeView.extend({
  template: JST['emailShow'],
  tagName: "ul",
  className: "email-show-item group",

  events: {
    "click .star": "starClick",
    "click #delete-message": "deleteMessage"
  },

  initialize: function(options) {
    options && (this.parentView = options.parentView)
  },

  render: function() {
    var content = this.template({ email: this.model });
    this.$el.html(content);
    if (this.model.get('trash')) {
      this.$('.garbage-can-holder').remove();
      this.$('.star').remove();
    }

    return this;
  },

  starClick: function(e) {
    e.preventDefault();

    $(e.currentTarget).toggleClass('star-on');
    if (this.model.get('starred')) {
      this.model.set('starred', false)
    } else {
      this.model.set('starred', true)
    }

    this.model.save({}, {
      error: function() {
        alert('error')
      }
    })
  },

  deleteMessage: function() {
    this.model.save({ "trash": true }, {
      error: function() {
        alert('error')
      }
    });

    this.parentView.removeSubview(".email-thread-list", this);
    this.parentView.goBackIfNoEmailsToShow();

    setTimeout(function() {
      Maildog.router.addFlash("The message has been moved to the trash.");
    }, 0);
  }
});
