var app = angular.module('app.Governance',[]);
app.controller('GovernanceController',['$scope', 'svGovernance', ShopCtrl]);
function ShopCtrl($scope, svGovernance) {
    $scope.products = [];
    svGovernance.getProducts().then(function (result) {
       $scope.products = result.data;
        console.log($scope.products.length);
    }, function (err) {
        console.log(err);
    });
}