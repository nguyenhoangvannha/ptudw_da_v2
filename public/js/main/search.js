var app = angular.module('app.search',[]);
app.controller('searchController',['$scope', 'svSearch', '$location', SearchCtrl]);
function SearchCtrl($scope, svSearch, $location) {
    $scope.products = [];
    var url = $location.absUrl();
    var key = url.substr(url.indexOf('?key') + 5);
    console.log(key); 
    svSearch.getProducts().then(function (result) {
       $scope.products = result.data;
        console.log($scope.products.length);
    }, function (err) {
        console.log(err);
    });

    $scope.searchResult = [];
    svSearch.searchProducts(key).then(function (result) {
      $scope.searchResult = result.data;
       console.log('xxx', $scope.searchResult);
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