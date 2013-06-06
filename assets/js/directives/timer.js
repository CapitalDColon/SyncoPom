
var app = require('../');
require('../filters/pad');

function timerDirective() {
  return {
    restrict: 'E',
    template: '<span class="minutes" data-ng-bind="minutes"></span>:<span class="seconds" data-ng-bind="seconds|pad"></span>',
    link : function(scope, elem, attr, ctrl) {
      scope.$watch(attr.remaining, function(val) {
        var min = Math.floor(val / 60000)
          , sec = Math.floor((val - (min * 60000)) / 1000);
        scope.minutes = '' + min;
        scope.seconds = '' + sec;
      });
    }
  }
}

app.directive('timer', [ timerDirective ]);

module.exports = 'timer';
