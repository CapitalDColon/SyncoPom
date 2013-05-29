
var app = require('../');

function DoneCtrl($scope, $location) {
  $scope.status = 'done';

  $scope.restartTimer = function() {
    $location.path('/active');
  }

  $scope.showInterruptions = function() {
    //TODO
  }
}

app.controller('DoneCtrl', [
  '$scope',
  '$location',

  DoneCtrl
]);

module.exports = 'DoneCtrl';
