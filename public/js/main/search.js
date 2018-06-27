var app = angular.module('app.search',[]);
app.controller('searchController',['$scope', 'svSearch', SearchCtrl]);
function SearchCtrl($scope, svSearch) {
    $scope.products = [];
    //var url = $location.absUrl().split('/');
    //var KEY = url[3];
    svSearch.getProducts().then(function (result) {
       $scope.products = result.data;
        console.log($scope.products.length);
    }, function (err) {
        console.log(err);
    });
    //$scope.result = [];
    //svSearch.searchProducts(KEY).then(function (result) {
      //  $scope.result = result;
        // console.log($scope.products.length);
     //}, function (err) {
       //  console.log(err);
     //});
}