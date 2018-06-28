var app = angular.module('app.product');
app.factory('svProduct', ['$http', function ($http) {
    return {
        getProduct: function (ID) {
            return $http.get('/api/product/' + ID);
        },
        getCompanies: function () {
            return $http.get('/api/companies');
        },
        getProducts: function () {
            return $http.get('/api/products');
        },
        getCompanyProducts: function (company) {
            console.log('company',company);
            return $http.get('/api/products/' + company);
        },
        getSameTypeProducts: function (LOAI) {
            return $http.get('/api/products/sameTo/' + LOAI);
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
    }
}])