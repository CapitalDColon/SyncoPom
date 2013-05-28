(function(angular){

  'use strict';

  var app = angular.module('pom', [
      'pom.controllers'
    , 'pom.directives'
    , 'pom.services'
  ]);

  console.log('here');

  app.config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      console.log('routing');
      $routeProvider
        .when('/', {
          templateUrl: '/partials/ready',
          controller: 'ReadyController'
        })
        .when('/active', {
          templateUrl: '/partials/active',
          controller: 'ActiveController'
        })
        .when('/active/:minutes', {
          templateUrl: '/partials/active',
          controller: 'ActiveController'
        })
        .when('/done', {
          templateUrl: '/partials/done',
          controller: 'DoneController'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }
  ]);

})(angular);
