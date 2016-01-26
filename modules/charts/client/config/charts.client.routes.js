'use strict';

angular.module('charts').config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('charts', {
      url: '/charts',
      templateUrl: 'modules/charts/views/charts.client.view.html',

      controller: 'ChartsController',
      resolve: {
        productItems: function (Products) {
          return Products.query(function (response) {
            // no code needed for success
          }, function (response) {

            if (response.status === 404) {
              // alert error message with method and url
              alert('Error accessing resource: ' + response.config.method + ' ' + response.config.url);
            } else {
              // alert status
              alert(response.statusText);
            }
          }).$promise;
        }
      }
    }
  );
}]);