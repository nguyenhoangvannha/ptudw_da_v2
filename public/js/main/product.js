var app = angular.module('app.product', ['ngRoute']);

app.controller('productController', ['$scope', 'svProduct', '$routeParams', '$location', ProductCtrl]);
function ProductCtrl($scope, svProduct, $routeParams, $location) {
    $scope.product = {};
    var url = $location.absUrl().split('/');
    var ID = url[5];
    var COMPANY = url[4];
    $scope.companies = [];
    console.log(ID);
    $scope.products = [];
    $scope.companyProducts = [];
    $scope.sameTypeProducts = [];

    function shuffle(array) {
        var m = array.length, t, i;
        // Chừng nào vẫn còn phần tử chưa được xáo trộn thì vẫn tiếp tục
        while (m) {
            // Lấy ra 1 phần tử
            i = Math.floor(Math.random() * m--);
            // Sau đó xáo trộn nó
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    svProduct.getProduct(ID).then(function (result) {
        $scope.product = result.data[0];
        svProduct.getSameTypeProducts($scope.product.LOAI).then(function (result) {
            $scope.sameTypeProducts = result.data;
            shuffle($scope.sameTypeProducts);
        }, function (err) {
            console.log(err);
        });
    }, function (err) {
        console.log(" PS", err);
    });
    svProduct.getProducts().then(function (result) {
        $scope.products = result.data;
    }, function (err) {
        console.log(err);
    });
    svProduct.getCompanyProducts(COMPANY).then(function (result) {
        $scope.companyProducts = result.data;
        shuffle($scope.companyProducts);
    }, function (err) {
        console.log(err);
    });
    svProduct.getCompanies().then(function (result) {
        result.data.forEach(element => {
            if (element.NHASANXUAT != 'undefined') {
                $scope.companies.push(element);
            }
        });
    });

}