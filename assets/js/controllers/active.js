
var app = require('../');
require('../directives/timer.js')

function ActiveCtrl($scope, $location, $routeParams, timerService) {
  console.log('active');
  $scope.status = 'active';
  var myInterval, endTimestamp, minutes;
  if ($routeParams.minutes) {
    minutes = $routeParams.minutes;
  }
  endTimestamp = timerService.getTimestamp(minutes);
  setRemaining(true);

  function setRemaining(sync) {
    var remaining = endTimestamp - Date.now();
    if (remaining > 0) {
      if (!sync) {
        return $scope.$apply(function() {
          $scope.remaining = remaining;
        });
      } else {
        return $scope.remaining = remaining;
      }
    }
    remaining = 0;
    window.clearInterval(myInterval);
    $scope.$apply(function() {
      $location.path('/done');
    });
  }
  myInterval = window.setInterval(setRemaining, 1000);

  $scope.$on('$destroy', function() {
    window.clearInterval(myInterval);
    timerService.clearTimestamp();
  });

  $scope.interruptions = [];

  $scope.prepInterruptions = function() {
    $scope.newInterruption = {
      name : '',
      remind : false
    }
    $scope.showInterruptForm = true;
  }

  $scope.registerInterruption = function() {
    $scope.showInterruptForm = false;
    $scope.interruptions.push($scope.newInterruption);
    $scope.newInterruption = {};
  }
}

app.controller('ActiveCtrl', [
  '$scope',
  '$location',
  '$routeParams',
  require('../services/timerSvc'),

  ActiveCtrl
]);

module.exports = 'ActiveCtrl';
