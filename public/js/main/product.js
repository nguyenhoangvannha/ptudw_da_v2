var app = angular.module('app.product', ['ngRoute']);

app.controller('productController', ['$scope', 'svProduct', '$routeParams', '$location', ProductCtrl]);
function ProductCtrl($scope, svProduct, $routeParams, $location) {
    $scope.product = {};
    var url = $location.absUrl().split('/');
    var ID = url[5];
    var COMPANY = url[4];
    $scope.companies = [];
    console.log(ID);
    $scope.products = [];
    $scope.companyProducts = [];
    $scope.sameTypeProducts = [];

    function shuffle(array) {
        var m = array.length, t, i;
        // Chừng nào vẫn còn phần tử chưa được xáo trộn thì vẫn tiếp tục
        while (m) {
            // Lấy ra 1 phần tử
            i = Math.floor(Math.random() * m--);
            // Sau đó xáo trộn nó
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    svProduct.getProduct(ID).then(function (result) {
        $scope.product = result.data[0];
        svProduct.getSameTypeProducts($scope.product.LOAI).then(function (result) {
            $scope.sameTypeProducts = result.data;
            shuffle($scope.sameTypeProducts);
        }, function (err) {
            console.log(err);
        });
    }, function (err) {
        console.log(" PS", err);
    });
    svProduct.getProducts().then(function (result) {
        $scope.products = result.data;
    }, function (err) {
        console.log(err);
    });
    svProduct.getCompanyProducts(COMPANY).then(function (result) {
        $scope.companyProducts = result.data;
        shuffle($scope.companyProducts);
    }, function (err) {
        console.log(err);
    });
    svProduct.getCompanies().then(function (result) {
        result.data.forEach(element => {
            if (element.NHASANXUAT != 'undefined') {
                $scope.companies.push(element);
            }
        });
    });
    //Cart
    $scope.cartCount = 0;
    $scope.cartPrice = 0;
    $scope.cartItems = [];
    $scope.cartProducts = [];
    svProduct.getCartProducts().then(function (result) {
        $scope.cartItems = result.data;
        $scope.cartItems.forEach(function (item) {// lặp trong danh sách các sản phẩm của giỏ hàng
            $scope.cartCount += item.SOLUONG;
            svProduct.getProduct(item.PRODUCTID).then(function (result) {// lấy thông tin chi tiết về 1 sản phầm có PRODUCTID
                $scope.cartPrice += result.data[0].GIABAN;
            }, function (err) {
                console.log(err);
            });
        })
    }, function (err) {
        console.log(err);
    });

    $scope.addToCart = function (product) {
        console.log(product);
        $scope.cartCount = $scope.cartCount + 1;
        svProduct.addToCart(product.ID).then(function (result) {
            
        }, function (err) {
            console.log(err);
        });
        //document.getElementById('count-item').textContent = ' '+ $scope.cartCount;
        $scope.cartPrice += product.GIABAN;
        //document.getElementById('cart_price').textContent = ' '+ $scope.cartPrice;
    }
}