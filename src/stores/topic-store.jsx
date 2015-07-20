var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [
    Actions
  ],
  getTopics: function() {
    Api.get('topics/defaults')
      .then(function(json) {
        this.topics = json.data;
        this.triggerChance();
      }.bind(this));
  },
  triggerChance: function() {
    this.trigger('chance', this.topics);
  }
});
