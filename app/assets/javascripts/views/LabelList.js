Maildog.Views.LabelList = Backbone.CompositeView.extend({
  template: JST['labelList'],

  events: {
    "click #create-new-label-button": "showTextBox"
  },

  initialize: function() {
    this.collection = new Maildog.Collections.Labels();
    this.collection.fetch({ reset: true });
    this.listenTo(this.collection, "reset", this.render);
    this.listenTo(
      this.collection, "add", this.addSubviewForLabel.bind(this)
    );
  },

  render: function() {
    this.$el.html(this.template());
    this.collection.forEach(this.addSubviewForLabel.bind(this));
    return this;
  },

  showTextBox: function(e) {
    e.preventDefault();
    this.$('#create-new-label-button').prop('disabled', true);
    this.$('.new-label-input').removeClass('invisible').focus();

    window.setTimeout(function() {
      $('html').click(function(e) {
        this.newLabel(e, { text: this.$('input').val() });
      }.bind(this));

      $('html').keydown(function(e) {
        if (e.which !== 13) { return; }
        this.newLabel(e, { text: this.$('input').val() });
      }.bind(this));

    }.bind(this), 0);
  },

  newLabel: function(e, options) {
    if (e.which !== 13 && $(e.target).hasClass("new-label-input")) { return; }
    $('html').off('click');
    $('html').off('keydown');

    if (options.text) {
      label = new Maildog.Models.Label({ name: options.text })
      label.save({}, {
        success: function(model) {
          this.collection.add(model)
        }.bind(this)
      });
      this.$('input').val("");
    }
    this.$('input').addClass('invisible');
    this.$('#create-new-label-button').prop('disabled', false);
  },

  addSubviewForLabel: function(label, prepend) {
    var subview = new Maildog.Views.LabelListItem({
      collection: this.collection,
      model: label
    });
    this.addSubview(".label-list", subview);
  }
});
