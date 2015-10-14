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

    var that = this;
    window.setTimeout(function () {
      Backbone.pubSub.on('checkBox', that.checkBox, that);
    }, 0);

    this.collection = new Maildog.Collections.Labels();
    this.collection.fetch();
  },

  events: {
    "click #delete-email-thread": "fireMoveToTrash",
    "click #delete-forever-email-thread": "fireDeleteForever",
    "click #recover-email-thread": "fireRecoverEvent",
    "click #email-show-back-button": "goBack",
    "click #refresh-button": "refreshCollection",
    "click .label-as-button-container": "showLabelList"
  },

  render: function(state, trash) {
    var template;

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

  fireMoveToTrash: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("moveToTrashThread");
  },

  fireDeleteForever: function(e) {
    e.preventDefault();
    Backbone.pubSub.trigger("deleteThread");
  },

  fireRecoverEvent: function(e) {
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
