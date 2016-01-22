'use strict';

angular.module('products').config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('products', {
      abstract: true,
      url: '/products',
      template: '<ui-view/>'
    })
    .state('products.list', {
      url: '',
      templateUrl: 'modules/products/views/list-products.client.view.html'
    })
    .state('products.detail', {
      url: '/:productId',
      templateUrl: 'modules/products/views/detail-products.client.view.html'
    })

    .state('products.edit', {
      url: '/edit/:productId',
      abstract: true,
      templateUrl: 'modules/products/views/edit-products.client.view.html'
    })
    .state('products.edit.info', {
      url: '/info',
      templateUrl: 'modules/products/views/edit-info-products.client.view.html'
    })
    .state('products.edit.price', {
      url: '/price',
      templateUrl: 'modules/products/views/edit-price-products.client.view.html'
    }).state('products.edit.tags', {
      url: '/tags',
      templateUrl: 'modules/products/views/edit-tags-products.client.view.html'
    })
  ;
}]);