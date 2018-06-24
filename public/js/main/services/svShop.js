var app = angular.module('app.shop');
app.factory('svShop', ['$http', function ($http) {
    return {
        getProducts: function () {
            return $http.get('/api/products');
        }
    };
}]);