(function(angular) {

  'use strict';

  var app = angular.module('pom.controllers', [])
    , myInterval;

  var ResetController = function ResetCtrl($injector, $scope, timerService) {
    window.clearInterval(myInterval);
    timerService.clearTimestamp();
  }

  app.controller('ReadyController', [
    '$injector',
    '$scope',
    '$location',
    'timerService',

    function ReadyCtrl($injector, $scope, $location, timerService) {
      $injector.invoke(ResetController, this, {$scope : $scope});
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
    '$injector',
    '$scope',
    '$location',
    '$routeParams',
    'timerService',

    function ActiveCtrl($injector, $scope, $location, $routeParams, timerService) {
      var endTimestamp, minutes;
      console.log($routeParams);
      $injector.invoke(ResetController, this, {$scope : $scope});
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
    '$injector',
    '$scope',
    '$location',

    function DoneCtrl($injector, $scope, $location) {
      $injector.invoke(ResetController, this, {$scope : $scope});
      window.clearInterval(myInterval);
      $scope.status = 'done';
    }
  ]);

})(angular);
