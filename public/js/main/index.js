var app = angular.module('app.index',[]);
app.controller('indexController', ['$scope', 'svIndex', function ($scope, svIndex) {
    $scope.products = [];
    $scope.newProducts = [];
    $scope.hotProducts = [];
    $scope.viewProducts = [];

    function compareByBuyDes(a,b) {
        if (a.SOLUOTBAN < b.SOLUOTBAN)
          return 1;
        if (a.SOLUOTBAN > b.SOLUOTBAN)
          return -1;
        return 0;
    }
    function compareByViewDes(a,b) {
        if (a.SOLUOTXEM < b.SOLUOTXEM)
          return 1;
        if (a.SOLUOTXEM > b.SOLUOTXEM)
          return -1;
        return 0;
    }

    svIndex.getProducts().then(function (result) {
        $scope.products = result.data;
        $scope.newProducts = result.data.slice();
        $scope.hotProducts = result.data.slice();
        $scope.viewProducts = result.data.slice();
        $scope.hotProducts.sort(compareByBuyDes);
        $scope.newProducts.reverse();
        $scope.viewProducts.sort(compareByViewDes);
    }, function (err) {
        console.log(err);
    });
    $scope.companies = [];
    
    svIndex.getCompanies().then(function (result) {
        result.data.forEach(element => {
            if(element.NHASANXUAT != 'undefined'){
                $scope.companies.push(element);
            }
        });
    });

    //Cart
    $scope.cartCount = 0;
    $scope.cartPrice = 0;
    $scope.cartItems = [];
    $scope.cartProducts = [];
    svIndex.getCartProducts().then(function (result) {
        $scope.cartItems = result.data;
        $scope.cartItems.forEach(function (item) {// lặp trong danh sách các sản phẩm của giỏ hàng
            $scope.cartCount += item.SOLUONG;
            svIndex.getProduct(item.PRODUCTID).then(function (result) {// lấy thông tin chi tiết về 1 sản phầm có PRODUCTID
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
        svIndex.addToCart(product.ID).then(function (result) {
            
        }, function (err) {
            console.log(err);
        });
        //document.getElementById('count-item').textContent = ' '+ $scope.cartCount;
        $scope.cartPrice += product.GIABAN;
        //document.getElementById('cart_price').textContent = ' '+ $scope.cartPrice;
    }
}]);