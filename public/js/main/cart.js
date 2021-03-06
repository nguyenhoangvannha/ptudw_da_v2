var app = angular.module('app.cart',[]);
app.controller('cartController', ['$scope', 'svCart', function ($scope, svCart) {
    $scope.cartCount = 0;
    $scope.cartPrice = 0;
    $scope.cartItems = [];
    $scope.cartProducts = [];
    svCart.getCartProducts().then(function (result) {
        $scope.cartItems = result.data;
        $scope.cartItems.forEach(function (item) {// lặp trong danh sách các sản phẩm của giỏ hàng
            $scope.cartCount += item.SOLUONG;
            svCart.getProduct(item.PRODUCTID).then(function (result) {// lấy thông tin chi tiết về 1 sản phầm có PRODUCTID
                $scope.cartPrice += result.data[0].GIABAN;
                $scope.cartProducts.push({
                    "SOLUONG":item.SOLUONG,
                    "PRODUCT": result.data[0]
                });
            }, function (err) {
                console.log(err);
            });
        })
        console.log("DSSP", $scope.cartProducts);
    }, function (err) {
        console.log(err);
    });
}]);