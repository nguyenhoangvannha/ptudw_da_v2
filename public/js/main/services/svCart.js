var app = angular.module('app.cart');
app.factory('svCart',['$http', function ($http) {
    return{
        getCartProducts: function () {
            return $http.get('/api/cart/');
        },
        getProduct: function (PRODUCTID) {
            return $http.get('/api/product/' + PRODUCTID);
        }
    };
}]);