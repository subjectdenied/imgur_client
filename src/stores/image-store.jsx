var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [
    Actions
  ],
  getImages: function(topicId) {
    Api.get('topics/' + topicId)
      .then(function(json) {
        // use lodash.reject to filter out albums
        this.images = _.reject(json.data, function(image) {
          return image.is_album;
        });
        this.triggerChange();
      }.bind(this));
  },
  getImage: function(id) {
    Api.get('gallery/image/' + id)
      .then(function(json) {
        //images has to be an array
        if (this.images) {
          this.images.push(json.data);
        } else {
          this.images = [json.data];
        }
        this.triggerChange();
      }.bind(this));
  },
  find: function(id) {
    var image = _.findWhere(this.images, {id: id});

    // chck if this.images is fetched
    if (image) {
      return image;
    } else {
      this.getImage(id);
      return null;
    }
  },
  triggerChange: function() {
    this.trigger('change', this.images);
  }
});
