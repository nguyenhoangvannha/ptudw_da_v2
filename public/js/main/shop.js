var app = angular.module('app.shop',[]);
app.controller('shopController',['$scope', 'svShop', ShopCtrl]);
function ShopCtrl($scope, svShop) {
    $scope.products = [];
    svShop.getProducts().then(function (result) {
       $scope.products = result.data;
        console.log($scope.products.length);
    }, function (err) {
        console.log(err);
    });
}