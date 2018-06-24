var app = angular.module('app.product',['ngRoute']);

app.controller('productController', ['$scope', 'svProduct', '$routeParams' , '$location', ProductCtrl]);
function ProductCtrl($scope, svProduct, $routeParams, $location) {
    $scope.product = {};
    var url = $location.absUrl().split('/');
    var ID = url[5];
    var COMPANY = url[4];
    $scope.companies = [];
    console.log(ID);
    $scope.products = [];
    $scope.companyProducts = [];
    svProduct.getProduct(ID).then(function (result) {
        $scope.product = result.data[0];
        console.log($scope.product);
    }, function (err) {
        console.log(" PS" , err);
    });
    svProduct.getProducts().then(function (result) {
        $scope.products = result.data;
        console.log($scope.products);
    }, function (err) {
        console.log(err);
    });
    svProduct.getCompanyProducts(COMPANY).then(function (result) {
        $scope.companyProducts = result.data;
        console.log('companyProducts',$scope.companyProducts);
    }, function (err) {
        console.log(err);
    });
    svProduct.getCompanies().then(function (result) {
        result.data.forEach(element => {
            if(element.NHASANXUAT != 'undefined'){
                $scope.companies.push(element);
            }
        });
        console.log($scope.companies);
    });
}