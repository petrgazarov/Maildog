Maildog.Views.EmailOptions = Backbone.CompositeView.extend({
  templateList: JST['emailOptionsList'],
  templateShow: JST['emailOptionsShow'],
  templateShowTrash: JST['emailOptionsShowTrash'],

  initialize: function() {
    this.checkedThreads = [];
    this._setUpListenersOnInitialize();
    this.collection = Maildog.labels;
  },

  events: {
    "click #delete-forever-email-thread": "deleteForever",
    "click #email-show-back-button": "goBack",
    "click #refresh-button": "refreshCollection",
    "click .label-as-button-container": "showLabelList",
    "click #recover-email-thread": function(e) { this.changeTrashValue(e, "recover") },
    "click #delete-email-thread": function(e) {
      if (this.state === 'drafts') {
        this.discardCheckedDrafts();
      } else {
        this.changeTrashValue(e, "move_to_trash")
      }
    }
  },

  render: function(state, trash, checked) {
    this._resetCheckBoxListener();

    var template = this._determineTemplate(state, trash, checked);
    this.state = state;

    this.$el.html(template());
    this._twickTemplate(state, checked);

    return this;
  },

  changeTrashValue: function(e, urlCap) {
    e.preventDefault();

    if (urlCap === "recover") {
      var flashMessage = "The conversation" + this._flashPhrasing() + "been recovered";
      var fireEvent = "recoverThread";
    } else {
      var flashMessage = "The conversation" + this._flashPhrasing() + "been moved to trash";
      var fireEvent = "moveToTrashThread";
    }

    if (this.checkedThreads.length > 0) {
      this._ajaxChangeTrashValue(urlCap, flashMessage);
    }
    else {
      Backbone.pubSub.trigger(fireEvent);
    }
  },

  deleteForever: function(e) {
    e.preventDefault();

    if (this.checkedThreads.length > 0) {
      this._ajaxDeleteForever();
    }
    else {
      Backbone.pubSub.trigger("deleteThread");
    }
  },

  discardCheckedDrafts: function() {
    $.ajax({
      url: "api/email_threads/discard_drafts",
      type: "DELETE",
      data: { "email_thread_ids": this.checkedThreads },
      dataType: "json",
      success: function() {
        Maildog.currentThreadList.refreshCollection();
        Maildog.router.addFlash("Drafts have been discarded");
        this.checkedThreads = [];
      }.bind(this),
      error: function() {
        alert("error");
      }
    });
  },

  goBack: function(e) {
    e.preventDefault();
    Backbone.history.navigate(this.backButtonValue, { trigger: true });
  },

  showLabelList: function() {
    if (!this.$('.email-options-label-list').hasClass('invisible')) { return; }

    if (this.state === "show") {
      Maildog.router.currentEmailThread.labels().fetch({ reset: true });
    }
    this._hideLabelListWhenClickAway();

    this.$('.icon-label-as-button').css('opacity', 1);
    this.$('.down-arrow-symbol').css('opacity', 1);
    this.$('.email-options-label-list').removeClass('invisible');

    this._fetchCollection();
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

  checkBox: function(action, threads) {
    if (action === 'empty') {
      this._emptyCheckedThreads();
    }
    else if (action === "remove") {
      this._removeCheckedThread(threads[0]);
    }
    else {
      this._updateCheckedThreads(threads);
    }
  },

  addSubviewforLabel: function(label) {
    var subview = new Maildog.Views.EmailOptionsLabelListItem({
      model: label,
      state: this.state
    });
    this.addSubview('.email-options-label-list', subview);
  },

  refreshCollection: function(e) {
    e.preventDefault();
    Maildog.router.removeFlashes();
    Backbone.pubSub.trigger("refreshCollection");
  },

  _updateCheckedThreads: function(threads) {
    this.checkedThreads = threads;

    var trash = (this.state === 'trash' ? true : false);

    if (this.checkedThreads.length === 0) {
      this.render(this.state, false, false);
    } else {
      this.render(this.state, trash, true);
    }
  },

  _removeCheckedThread: function(thread) {
    this.checkedThreads.splice(this.checkedThreads.indexOf(thread), 1);

    var trash = (this.state === 'trash' ? true : false);

    if (this.checkedThreads.length === 0) {
      this.render(this.state, false, false);
    } else {
      this.render(this.state, trash, true);
    }
  },

  _emptyCheckedThreads: function() {
    this.checkedThreads = [];
  },

  _setUpListenersOnInitialize: function() {
    this.listenTo(
      Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
    );
    this.listenTo(Maildog.router, "folderNavigation", function(state) {
      if (state === "nonFolder") { return }
      
      this.render(state, false);
      this.backButtonValue = state;
    });
  },

  _twickTemplate: function(state, checked) {
    if (checked) {
      this.$('#email-show-back-button').remove();
      this.$('.label-as-button-container').remove();
    }
    if (state === "drafts") {
      this.$('#delete-email-thread').text("Discard Drafts")
                                    .css("font-size", 14).css('width', '100px');
    }
  },

  _determineTemplate: function(state, trash, checked) {
    if (trash) {
      return this.templateShowTrash;
    }
    else if (checked) {
      return this.templateShow;
    }
    else {
      return state === "show" ? this.templateShow : this.templateList
    }
  },

  _resetCheckBoxListener: function() {
    var that = this;
    Backbone.pubSub.off('checkBox');
    Backbone.pubSub.on('checkBox', that.checkBox, that);

    window.setTimeout(function () {
      Backbone.pubSub.off('checkBox');
      Backbone.pubSub.on('checkBox', that.checkBox, that);
    }, 0);
  },

  _flashPhrasing: function() {
    return this.checkedThreads.length > 1 ? "s have " : " has "
  },

  _ajaxChangeTrashValue: function(urlCap, flashMessage) {
    $.ajax({
      url: "api/email_threads/" + urlCap,
      type: "POST",
      data: { "email_thread_ids": this.checkedThreads },
      dataType: "json",
      success: function() {
        Maildog.currentThreadList.refreshCollection();
        Maildog.router.addFlash(flashMessage);
        this.checkedThreads = [];

        this.render(this.state, false, false);
      }.bind(this),
      error: function() {
        alert("error");
      }
    });
  },

  _ajaxDeleteForever: function() {
    $.ajax({
      url: "api/email_threads/nil",
      type: "DELETE",
      data: { "email_thread_ids": this.checkedThreads },
      dataType: "json",
      success: function() {
        Maildog.currentThreadList.refreshCollection();
        Maildog.router.addFlash(
          "The conversation" + this._flashPhrasing() + "been deleted"
        );
        this.checkedThreads = [];

        this.render(this.state, false, false);
      }.bind(this),
      error: function() {
        alert("error");
      }
    });
  },

  _hideLabelListWhenClickAway: function() {
    window.setTimeout(function() {
      $('html').click(function(e) {
        this.hideLabelList(e);
      }.bind(this))
    }.bind(this), 0);
  },

  _fetchCollection: function() {
    this.collection.fetch({
      success: function() {
        this.collection.forEach(this.addSubviewforLabel.bind(this));
      }.bind(this),
      error: function() {
        alert('error')
      }
    });
  }
});
