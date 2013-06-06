
var app = require('./')

  /**
   * Controllers
   */
  , ready = require('./controllers/ready')
  , active = require('./controllers/active')
  , done = require('./controllers/done');


app.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/ready',
        controller: ready
      })
      .when('/active', {
        templateUrl: '/partials/active',
        controller: active
      })
      .when('/active/:minutes', {
        templateUrl: '/partials/active',
        controller: active
      })
      .when('/done', {
        templateUrl: '/partials/done',
        controller: done
      })
      .otherwise({
        templateUrl: '/partials/active',
        controller: active
      });

    $locationProvider.html5Mode(true);
  }
]);
