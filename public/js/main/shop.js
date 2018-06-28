var app = angular.module('app.shop',[]);
app.controller('shopController',['$scope', 'svShop', ShopCtrl]);

function ShopCtrl($scope, svShop) {
    // var url = $location.absUrl().split('/');
    var key = window.location.href.split('/')[4];
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
       if(key != undefined && !isNaN(key)){
        $scope.typeClick(key);
       } else{
        if(key != undefined){
            $scope.companyClick(key);
           } else {
            $scope.currentProducts = $scope.products;
           }
       }
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
        window.history.pushState('page2', 'Title', '/shop/' + company);
        var temp = [];
        $scope.products.forEach(function (item) {
            if(item.NHASANXUAT.toLowerCase() == company.toLowerCase()){
                temp.push(item);
            }
        });
        $scope.currentProducts = temp;
    };
    $scope.typeClick = function (type) {
        window.history.pushState('page2', 'Title', '/shop/' + type);
        var temp = [];
        $scope.products.forEach(function (item) {
            if(item.LOAI == type){
                temp.push(item);
            }
        });
        $scope.currentProducts = temp;
    };
}