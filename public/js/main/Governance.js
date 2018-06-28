var app = angular.module('app.Governance', []);
app.controller('GovernanceController', ['$scope', 'svGovernance', ShopCtrl]);
function ShopCtrl($scope, svGovernance) {
    $scope.products = [];
    svGovernance.getProducts().then(function (result) {
        $scope.products = result.data;
        console.log($scope.products.length);
    }, function (err) {
        console.log(err);
    });
    $scope.deleteProduct = function (productID) {
        svGovernance.deleteproduct(productID).then(function (result) {
            $scope.products = result.data;
            console.log($scope.products.length);
        }, function (err) {
            console.log(err);
        });
    }
}
app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});