var app = angular.module('app.profile',[]);
app.controller('profileController', ['$scope', 'svProfile', function ($scope, svProfile) {
    //Cart
    $scope.cartCount = 0;
    $scope.cartPrice = 0;
    $scope.cartItems = [];
    $scope.cartProducts = [];
    svProfile.getCartProducts().then(function (result) {
        $scope.cartItems = result.data;
        $scope.cartItems.forEach(function (item) {// lặp trong danh sách các sản phẩm của giỏ hàng
            $scope.cartCount += item.SOLUONG;
            svProfile.getProduct(item.PRODUCTID).then(function (result) {// lấy thông tin chi tiết về 1 sản phầm có PRODUCTID
                $scope.cartPrice += result.data[0].GIABAN;
            }, function (err) {
                console.log(err);
            });
        })
    }, function (err) {
        console.log(err);
    });
}]);