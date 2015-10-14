Maildog.Views.EmailOptions = Backbone.CompositeView.extend({
  templateList: JST['emailOptionsList'],
  templateShow: JST['emailOptionsShow'],
  templateShowTrash: JST['emailOptionsShowTrash'],

  initialize: function() {
    this.listenTo(
      Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
    );
    this.listenTo(Maildog.router, "folderNavigation", function(state) {
      this.render(state, false);
      this.backButtonValue = state;
    });

    this.collection = new Maildog.Collections.Labels();
    this.collection.fetch();
  },

  events: {
    "click #delete-forever-email-thread": "deleteForever",
    "click #email-show-back-button": "goBack",
    "click #refresh-button": "refreshCollection",
    "click .label-as-button-container": "showLabelList",
    "click #recover-email-thread": function(e) { this.changeTrashValue(e, "recover") },
    "click #delete-email-thread": function(e) { this.changeTrashValue(e, "move_to_trash") }
  },

  render: function(state, trash) {
    var template;

    var that = this;
    window.setTimeout(function () {
      Backbone.pubSub.on('checkBox', that.checkBox, that);
    }, 0);

    if (trash) {
      template = this.templateShowTrash;
    }
    else {
      template = (
        state === "show" || state === "checked" ? this.templateShow : this.templateList
      );
      this.state = state || "list";
    }

    this.$el.html(template());
    if (state === "checked") { this.$('#email-show-back-button').remove() }

    return this;
  },

  changeTrashValue: function(e, urlCap) {
    e.preventDefault();
    if (urlCap === "recover") {
      var flashMessage = "The conversation(s) have been recovered";
      var fireEvent = "recoverThread";
    } else {
      var flashMessage = "The conversation(s) have been moved to trash";
      var fireEvent = "moveToTrashThread";
    }

    if (this.checkedThreads && this.checkedThreads.length > 0) {
      $.ajax({
        url: "api/email_threads/" + urlCap,
        type: "POST",
        data: { "email_thread_ids": this.checkedThreads },
        dataType: "json",
        success: function() {
          Maildog.currentThreadList.refreshCollection();
          Maildog.router.addFlash(flashMessage);
        },
        error: function() {
          alert("error");
        }
      });
    } else {
      Backbone.pubSub.trigger(fireEvent);
    }
  },

  deleteForever: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("deleteThread");
  },

  recover: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("recoverThread");
  },

  goBack: function(e) {
    e.preventDefault();
    Backbone.history.navigate(this.backButtonValue, { trigger: true });
  },

  showLabelList: function() {
    Maildog.router.currentEmailThread.labels().fetch({ reset: true });

    if (!this.$('.email-options-label-list').hasClass('invisible')) { return; }
    window.setTimeout(function() {
      $('html').click(function(e) {
        this.hideLabelList(e);
      }.bind(this))
    }.bind(this), 0);

    this.$('.icon-label-as-button').css('opacity', 1);
    this.$('.down-arrow-symbol').css('opacity', 1);
    this.$('.email-options-label-list').removeClass('invisible');
    this.collection.fetch({
      success: function() {
        this.collection.forEach(this.addSubviewforLabel.bind(this));
      }.bind(this),
      error: function() {
        alert('error')
      }
    });
  },

  hideLabelList: function(e) {
    if (
        ($(e.target).parents().filter('.email-options-label-list').length > 0 &&
          $(e.target).prop('tagName') !== "LI") ||
         $(e.target).hasClass('email-options-label-list')
        ) {
      return;
    }

    this.$('.email-options-label-list').addClass('invisible');
    this.$('.icon-label-as-button').css('opacity', .55);
    this.$('.down-arrow-symbol').css('opacity', .55);

    this.eachSubview(function(subview) {
      subview.remove();
    }.bind(this));

    delete this.subviews;
    $('html').off('click');
  },

  checkBox: function(threadIds) {
    this.checkedThreads = threadIds;

    if (this.checkedThreads.length === 0) {
      this.render();
    } else {
      if (this.state !== "checked") {
        this.render("checked", false);
      }
    }
  },

  addSubviewforLabel: function(label) {
    var subview = new Maildog.Views.EmailOptionsLabelListItem({
      model: label
    });
    this.addSubview('.email-options-label-list', subview);
  },

  refreshCollection: function(e) {
    e.preventDefault();
    Maildog.router.removeFlashes();
    Backbone.pubSub.trigger("refreshCollection");
  }
});
