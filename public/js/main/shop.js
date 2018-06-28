var app = angular.module('app.shop',[]);
app.controller('shopController',['$scope', 'svShop', ShopCtrl]);

function ShopCtrl($scope, svShop) {
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
    $scope.products = [];
    $scope.currentProducts = [];
    svShop.getProducts().then(function (result) {
       $scope.products = result.data;
       $scope.currentProducts = $scope.products;
       //shuffle($scope.products);
    }, function (err) {
        console.log(err);
    });
    $scope.companies = [];
    svShop.getCompanies().then(function (result) {
        result.data.forEach(element => {
            if (element.NHASANXUAT != 'undefined') {
                $scope.companies.push(element);
            }
        });
    });
    $scope.types = [];
    svShop.getTypes().then(function (result) {
        result.data.forEach(element => {
            if (element.LOAI != 'undefined') {
                $scope.types.push(element);
            }
        });
    });
    $scope.companyClick = function (company) {
        console.log("cpn",company);
        var temp = [];
        $scope.products.forEach(function (item) {
            if(item.NHASANXUAT == company){
                temp.push(item);
            }
        });
        $scope.currentProducts = temp;
        console.log($scope.currentProducts);
    };
}