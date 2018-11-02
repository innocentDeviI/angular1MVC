angular.module('mobileMVC')
    .controller('CartDetailsCtrl', function CartDetailsCtrl($scope, $location, store) {
        'use strict';
        $scope.cartItems = store;
        $scope.total = 0;
        $scope.totalSavings = 0;
        
        $scope.getTotal = function() {
            for(var i=0; i< $scope.cartItems.length;i++) {
                if( $scope.cartItems[i].price) 
                    $scope.total += parseInt( $scope.cartItems[i].price);         
                if( $scope.cartItems[i].discountedPrice)
                    $scope.totalSavings += parseInt( $scope.cartItems[i].discountedPrice);         
            }
            $scope.totalSavings = $scope.totalSavings - $scope.total;
        }
        $scope.$on('$viewContentLoaded', function(){
            $scope.getTotal();
        });
        $scope.goToDetails = function() {
            $location.path('/');
        }
        
    });