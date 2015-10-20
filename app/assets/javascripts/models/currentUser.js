Maildog.Models.CurrentUser = Backbone.Model.extend({
  url: "/api/session",

  fetchUser: function(options) {
    var model = this;
    var credentials = {
      "user[username]": options.username
    };

    $.ajax({
      url: this.url + "/fetch",
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  }
})
