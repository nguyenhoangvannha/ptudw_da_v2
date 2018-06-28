var app = angular.module('app.shop');
app.factory('svShop', ['$http', function ($http) {
    return {
        getProducts: function () {
            return $http.get('/api/products');
        },
        getCompanies: function () {
            return $http.get('/api/companies');
        },
        getTypes: function () {
            return $http.get('/api/types');
        }
    };
}]);