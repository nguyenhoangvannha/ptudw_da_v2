var app = angular.module('app.index');
app.factory('svIndex',['$http', function ($http) {
    return{
        getProducts: function () {
            return $http.get('/api/products');
        },
        getCompanies: function () {
            return $http.get('/api/companies');
        }
    };
}]);