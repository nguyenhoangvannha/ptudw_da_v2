var app = angular.module('app.profile');
app.factory('svProfile',['$http', function ($http) {
    return{
        getCartProducts: function () {
            return $http.get('/api/cart/');
        },
        getProduct: function (PRODUCTID) {
            return $http.get('/api/product/' + PRODUCTID);
        }
    };
}]);