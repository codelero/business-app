'use strict';

angular.module('charts').controller('ChartsController', ['$scope', 'productItems', 'ProductsUtilities', '$filter', function ($scope, productItems, ProductsUtilities, $filter) {
  var i;

  $scope.title="Price Analytics";

  // Computed property
  for (i = 0; i < productItems.length; i++) {
    productItems[i].marginPercent =
      ProductsUtilities.calculateMarginPercent(productItems[i].price,
        productItems[i].cost);
    productItems[i].marginAmount =
      ProductsUtilities.calculateMarginAmount(productItems[i].price,
        productItems[i].cost);
  }
  var orderedProductsAmount = $filter("orderBy")(productItems, "marginAmount", true);
  var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

  // create chart data for amount
  var chartDataAmount = [];
  for (i = 0; i < filteredProductsAmount.length; i++) {
    chartDataAmount.push({
      x: filteredProductsAmount[i].productName,
      y: [filteredProductsAmount[i].cost,
        filteredProductsAmount[i].price,
        filteredProductsAmount[i].marginAmount]
    });
  }

  $scope.dataAmount = {
    series: ["Cost", "Price", "Margin Amount"],
    data: chartDataAmount
  };

  $scope.configAmount = {
    title: "Top $ Margin Products",
    tooltips: true,
    labels: false,
    mouseover: function () { },
    mouseout: function () { },
    click: function () { },
    legend: {
      display: true,
      position: "right"
    }
  };

  var orderedProductsPercent = $filter("orderBy")(productItems, "marginPercent", true);
  var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

  var chartDataPercent = [];
  for (i = 0; i < filteredProductsPercent.length; i++) {
    chartDataPercent.push({
      x: filteredProductsPercent[i].productName,
      y: [filteredProductsPercent[i].marginPercent]
    });
  }

  $scope.dataPercent = {
    series: ["Margin %"],
    data: chartDataPercent
  };

  $scope.configPercent = {
    title: "Top % Margin Products",
    tooltips: true,
    labels: false,
    mouseover: function () { },
    mouseout: function () { },
    click: function () { },
    legend: {
      display: true,
      position: "right"
    }
  };

}]);
