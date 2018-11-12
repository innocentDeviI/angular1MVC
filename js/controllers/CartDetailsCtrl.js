angular.module('mobileMVC')
    .controller('CartDetailsCtrl', function CartDetailsCtrl($scope, $location, store, $filter) {
        'use strict';
        $scope.cartItems = store.getCartItems();
        
        $scope.getTotal = function() {
            $scope.total = 0;
            $scope.totalSavings = 0;   
                     
            for(var i=0; i< store.getCartItems().length;i++) {
                if(store.getCartItems()[i].price) 
                    $scope.total += parseInt(store.getCartItems()[i].price);         
                if(store.getCartItems()[i].discountedPrice)
                    $scope.totalSavings += parseInt(store.getCartItems()[i].discountedPrice);         
            }
            $scope.cartItems.totalItems = store.getCartItems().length;    
            $scope.totalSavings = $scope.totalSavings - $scope.total;
        }
        $scope.$on('$viewContentLoaded', function(){
            $scope.getTotal();
            $scope.cartItems = [...new Set($scope.cartItems)];
            console.log($scope.cartItems);
        });
        $scope.addToCart = function (mobile) {
			store.setCartItem(mobile);
		}
        $scope.removeFromCart = function(mobile) {
            store.removeCartItem(mobile)
            if(mobile.addedItemCount == 0) {
               for(var i=0;i<$scope.cartItems.length;i++){
                   if(mobile._id === $scope.cartItems[i]._id)
                    $scope.cartItems.splice(i,1);
               }
            }
            $scope.getTotal();
        }
        
    });