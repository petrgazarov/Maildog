Maildog.Collections.Folders = Backbone.Collection.extend({
  url: "/api/folders",

  model: Maildog.Models.Folder
});
