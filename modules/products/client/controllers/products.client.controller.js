'use strict';

angular.module('products').controller('ProductsController', ['$scope', 'Products', '$stateParams', '$state', 'toaster', function ($scope, Products, $stateParams, $state, toaster) {


  // All editing kept in one place
  // Avoids any two way binding issues
  $scope.edit = {
    product: {},
    newTags: '',
    datePicker: {
      open: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.edit.datePicker.opened = !$scope.edit.datePicker.opened;
      }
    }
  };

  $scope.showImages = false;

  $scope.toggleImages = function () {
    $scope.showImages = !$scope.showImages;
  };

  $scope.find = function () {
    $scope.products = Products.query();
  };

  $scope.findOne = function () {


    if ($stateParams.productId === 'new') {
      $scope.edit.pageTitle = 'Create New Product';
    } else {
      Products.get({
        productId: $stateParams.productId
      }, function (data) {
        $scope.product = data;
        $scope.edit.product = data;
        $scope.edit.pageTitle = 'Update ' + $scope.edit.product.productName;
        // Fixes date validation issue cause by released date data being return as a string
        // TODO investigate
        $scope.edit.product.releaseDate = $scope.edit.product.releaseDate ?
                                          new Date($scope.edit.product.releaseDate) :
                                          '';

        // Add tags array as a string
        if ($scope.product.tags) {
          $scope.tagList = $scope.product.tags.toString();
        }
      });
    }

  };


  $scope.addTags = function (tags) {

    if (tags) {
      $scope.error = '';
      tags = tags.split(',');
      $scope.edit.newTags = '';

      // Check if tag already exists
      angular.forEach(tags, function (tag, index) {
        if ($scope.product.tags.indexOf(tag) > 1) {
          tags.splice(index, 1);
        }
      });
      $scope.product.tags = $scope.product.tags.concat(tags);

    } else {
      $scope.error = 'Please enter one or more tabs separated by a comma';
    }

  };

  $scope.removeTag = function (tag) {
    var index = $scope.product.tags.indexOf(tag);
    $scope.product.tags.splice(index, 1);

  };

  $scope.save = function (isValid) {
    var product = $scope.edit.product;
    console.log(product);
    console.log('is', isValid);

    if (!isValid) {
      toaster.pop('error', 'Please ensure all fields are valid');

    } else {
      // New product
      if ($stateParams.productId === 'new') {

        var newProduct = new Products(product);
        newProduct.$save(function (data) {

          toaster.pop('success', 'Save Successful');
        });

        // Update existing product
      } else {

        product.$update(function () {
          toaster.pop('success', 'Update Successful');

        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;

        });
      }

    }
  };

  $scope.cancel = function () {
    $state.go('products.list');
  };

  // Update existing Article
  //$scope.update = function () {
  //  var article = $scope.article;
  //
  //  article.$update(function () {
  //    $location.path('articles/' + article._id);
  //  }, function (errorResponse) {
  //    $scope.error = errorResponse.data.message;
  //  });
  //};
  //$scope.findOne = function () {
  //  $scope.article = Articles.get({
  //    articleId: $stateParams.articleId
  //  });
  //};
}]);