var app = angular.module('app.search');
app.factory('svSearch', ['$http', function ($http) {
    return {
        getProducts: function () {
            return $http.get('/api/products');
        },
        searchProducts: function (KEY) {
            return $http.get('/api/search/' + KEY);
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