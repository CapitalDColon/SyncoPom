
var app = require('../');

function ReadyCtrl($scope, $location) {
  $scope.status = 'ready';
  $scope.startTimer = function() {
    var path = '/active';
    if ($scope.minutes) {
      path += '/' + $scope.minutes;
    }
    $location.path(path);
  }
}

app.controller('ReadyCtrl', [
  '$scope',
  '$location',

  ReadyCtrl
]);

module.exports = 'ReadyCtrl';
