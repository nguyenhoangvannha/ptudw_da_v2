var app = angular.module('app.search', []);
app.controller('searchController', ['$scope', 'svSearch', '$location', SearchCtrl]);
function SearchCtrl($scope, svSearch, $location) {
  $scope.products = [];
  var url = $location.absUrl();
  var key = url.substr(url.indexOf('?key') + 5);
  console.log(key);
  svSearch.getProducts().then(function (result) {
    $scope.products = result.data;
    console.log($scope.products.length);
  }, function (err) {
    console.log(err);
  });

  $scope.searchResult = [];
  svSearch.searchProducts(key).then(function (result) {
    $scope.searchResult = result.data;
    console.log('xxx', $scope.searchResult);
  }, function (err) {
    console.log(err);
  });
  //Cart
  $scope.cartCount = 0;
  $scope.cartPrice = 0;
  $scope.cartItems = [];
  $scope.cartProducts = [];
  svSearch.getCartProducts().then(function (result) {
      $scope.cartItems = result.data;
      $scope.cartItems.forEach(function (item) {// lặp trong danh sách các sản phẩm của giỏ hàng
          $scope.cartCount += item.SOLUONG;
          svSearch.getProduct(item.PRODUCTID).then(function (result) {// lấy thông tin chi tiết về 1 sản phầm có PRODUCTID
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
      svSearch.addToCart(product.ID).then(function (result) {
          
      }, function (err) {
          console.log(err);
      });
      //document.getElementById('count-item').textContent = ' '+ $scope.cartCount;
      $scope.cartPrice += product.GIABAN;
      //document.getElementById('cart_price').textContent = ' '+ $scope.cartPrice;
  }


  //$scope.result = [];
  //svSearch.searchProducts(KEY).then(function (result) {
  //  $scope.result = result;
  // console.log($scope.products.length);
  //}, function (err) {
  //  console.log(err);
  //});
}

app.filter('range', function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});