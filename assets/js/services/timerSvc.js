
var app = require('../');

function timerService() {
  var endTimestamp
    , resetTimestamp = function (duration) {
      return endTimestamp = Date.now() + (duration * 60000);
      // return endTimestamp = Date.now() + (duration * 10000);
    }
    , endTimestamp = resetTimestamp();

  return {
    getTimestamp : function(duration) {
      if (endTimestamp) {
        return endTimestamp;
      } else {
        var newDuration = 25;
        if (duration && parseFloat(duration) > 0) {
          newDuration = duration;
        }
        return resetTimestamp(newDuration);
      }
    },
    clearTimestamp : function () {
      endTimestamp = null;
    }
  }
}

app.factory('timerService', [ timerService ]);

module.exports = 'timerService';
