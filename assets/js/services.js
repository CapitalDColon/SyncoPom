(function(angular){

  'use strict';

  var app = angular.module('pom.services', []);

  app.factory('timerService', [
    function timerService() {
      var endTimestamp
        , resetTimestamp = function (duration) {
          return endTimestamp = Date.now() + (duration * 10000);
        }
        , endTimestamp = resetTimestamp();

      return {
        getTimestamp : function(duration) {
          if (endTimestamp) {
            return endTimestamp;
          } else {
            var newDuration = 25;
            if (duration && parseInt(duration) > 0) {
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
  ]);

})(angular);
