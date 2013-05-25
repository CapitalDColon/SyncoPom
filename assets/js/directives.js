(function(angular){

  'use strict';

  var app = angular.module('pom.directives', []);

  app.directive('timer', [
    function timerDirective() {
      return {
        restrict: 'E',
        link : function(scope, elem, attr, ctrl) {
          scope.$watch(attr.remaining, function(val) {
            var min = Math.floor(val / 60000)
              , sec = Math.floor((val - (min * 60000)) / 1000);
            elem.text('' + min + ':' + (sec > 9 ? sec : '0' + sec) );
          });
        }
      }
    }
  ]);

})(angular);