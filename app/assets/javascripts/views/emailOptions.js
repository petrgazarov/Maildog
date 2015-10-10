Maildog.Views.EmailOptions = Backbone.CompositeView.extend({
  template_list: JST['emailOptionsList'],
  template_show: JST['emailOptionsShow'],

  initialize: function() {
    this.listenTo(
      Maildog.router, "showEmailMessageOptions", this.render.bind(this, "show")
    );
    this.listenTo(Maildog.router, "folderNavigation", function(state) {
      this.render(state);
      this.backButtonValue = state;
    });

    this.collection = new Maildog.Collections.Labels();
    this.collection.fetch();
  },

  events: {
    "click #delete-email-thread": "fireDeleteEvent",
    "click #email-show-back-button": "goBack",
    "click #refresh-button": "refreshCollection",
    "click .label-as-button-container": "showLabelList"
  },

  render: function(state) {
    var template = (state === "show" ? this.template_show : this.template_list);
    this.$el.html(template());
    return this;
  },

  fireDeleteEvent: function(e) {
    e.preventDefault();

    if (this.backButtonValue === "trash") {
      Backbone.pubSub.trigger("deleteThread");
    }
    else {
      Backbone.pubSub.trigger("moveToTrashThread");
    }
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
