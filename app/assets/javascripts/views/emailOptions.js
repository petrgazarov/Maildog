Maildog.Views.EmailOptions = Backbone.View.extend({
  template_list: JST['emailOptionsList'],
  template_show: JST['emailOptionsShow'],

  render: function(state, email) {
    var content;
    if (state === "list") {
      content = this.template_list();
    }
    else if (state === "show") {
      content = this.template_show({ email: email })
    };

    this.$el.html(content);
    return this;
  }


});
