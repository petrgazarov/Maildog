Maildog.Views.EmailOptionsLabelListItem = Backbone.View.extend({
  template: JST['emailOptionsLabelListItem'],
  tagName: "li",

  events: {
    "click": "labelItemClick"
  },

  initialize: function(options) {
    this.state = options.state;
  },

  render: function() {
    var content = this.template({ label: this.model });
    this.$el.html(content);
    this.renderPinkIfLabeled();

    return this;
  },

  labelItemClick: function() {
    this.$el.toggleClass('pink-background');
    if (this.state !== "show") { return; }

    if (Maildog.router.currentEmailThread.labels().get(this.model.id)) {
      this._deleteThreadLabel();
    }
    else {
      this._createThreadLabel();
    }
  },

  renderPinkIfLabeled: function() {
    if (this.state !== "show") { return; }

    if (Maildog.router.currentEmailThread.labels().get(this.model.id)) {
      this.$el.addClass('pink-background');
    }
  },

  _deleteThreadLabel: function() {
    $.ajax({
      url: "api/thread_labels/nil",
      method: "DELETE",
      data: { "thread_label": {
        "label_id": this.model.id,
        "email_thread_id": Maildog.router.currentEmailThread.id
      }},
      dataType: "json",
      success: function() {
        Maildog.router.currentEmailThread.labels().remove(
          Maildog.router.currentEmailThread.labels().get(this.model.id)
        );
        Maildog.router.addFlash(
          "The conversation has been removed from " + this.model.get('name')
        );
      }.bind(this),
      error: function() {
        alert("error")
      }
    });
  },

  _createThreadLabel: function() {
    var threadLabel = new Maildog.Models.ThreadLabel({
      label_id: this.model.id,
      email_thread_id: Maildog.router.currentEmailThread.id
    })
    threadLabel.save({}, {
      success: function() {
        Maildog.router.addFlash(
          "The conversation has been added to " + this.model.get('name')
        );
        Maildog.router.currentEmailThread.labels().add(this.model);
      }.bind(this)
    });
  }
});
