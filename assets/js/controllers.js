(function(angular) {

  'use strict';

  var app = angular.module('pom.controllers', []);

  app.controller('ReadyController', [
    '$scope',
    '$location',
    'timerService',

    function ReadyCtrl($scope, $location, timerService) {
      $scope.status = 'ready';
      $scope.startTimer = function() {
        if ($scope.minutes) {
          return $location.path('/active/' + $scope.minutes);
        }
        $location.path('/active');
      }
    }
  ]);

  app.controller('ActiveController', [
    '$scope',
    '$location',
    '$routeParams',
    'timerService',

    function ActiveCtrl($scope, $location, $routeParams, timerService) {
      var myInterval, endTimestamp, minutes;
      if ($routeParams.minutes) {
        minutes = $routeParams.minutes;
      }
      endTimestamp = timerService.getTimestamp(minutes);
      $scope.status = 'active';
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
  ]);

  app.controller('DoneController', [
    '$scope',
    '$location',

    function DoneCtrl($scope, $location) {
      $scope.status = 'done';
    }
  ]);

})(angular);
