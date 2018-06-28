var app = angular.module('app.index');
app.factory('svIndex',['$http', function ($http) {
    return{
        getProducts: function () {
            return $http.get('/api/products');
        },
        getCompanies: function () {
            return $http.get('/api/companies');
        },
        addToCart: function (productID) {
            return $http.post('/api/cart/add/'+ productID);
        },
        getCartProducts: function () {
            return $http.get('/api/cart/');
        },
        getProduct: function (PRODUCTID) {
            return $http.get('/api/product/' + PRODUCTID);
        }
    };
}]);