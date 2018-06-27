var app = angular.module('app.Governance');
app.factory('svGovernance', ['$http', function ($http) {
    return {
        getProducts: function () {
            return $http.get('/api/products');
        }
    };
}]);