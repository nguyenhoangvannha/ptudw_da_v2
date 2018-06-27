var app = angular.module('app.search');
app.factory('svSearch', ['$http', function ($http) {
    return {
        getProducts: function () {
            return $http.get('/api/products');
        },
        searchProducts: function (KEY) {
            return $http.get('/api/search/' + KEY);
        }
    };
}]);