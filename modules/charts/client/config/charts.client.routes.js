'use strict';

angular.module('charts').config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('charts', {
      url: '/charts',
      templateUrl:
        'modules/charts/views/charts.client.view.html',

      controller: 'ChartsController',
      resolve: {
        productItems: function (Products) {
          return Products.query().$promise;
        }
      }
      //templateUrl: 'modules/core/views/home.client.view.html'
    }
  );
}]);