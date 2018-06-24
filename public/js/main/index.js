var app = angular.module('app.index',[]);
app.controller('indexController', ['$scope', 'svIndex', function ($scope, svIndex) {
    $scope.products = [];
    svIndex.getProducts().then(function (result) {
        $scope.products = result.data;
    }, function (err) {
        console.log(err);
    });
    $scope.companies = [];
    svIndex.getCompanies().then(function (result) {
        result.data.forEach(element => {
            if(element.NHASANXUAT != 'undefined'){
                $scope.companies.push(element);
            }
        });
    });
}]);