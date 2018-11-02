/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the mobileStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('mobileMVC')
	.controller('MobileCtrl', function MobileCtrl($scope, $routeParams, $location, store) {
		'use strict';

		$scope.mobiles = store.mobiles;

		$scope.newMobile = '';
		$scope.editedMobile = null;
		$scope.enableMenu = false;
		$scope.selectedMobile = {};
		$scope.cartItems = (store.getCartItems().length > 0) ? store.getCartItems() : [];

		$scope.$on('$viewContentLoaded', function () {
			
			var _cartItems = Array.from($scope.cartItems);
			var _mobiles = Array.from($scope.mobiles);
			console.log(_mobiles);
			if(_cartItems) {
				for(var i=0; i<_cartItems.length; i++) {
					for(var j=0; j<_mobiles.length;i++) {
						if(_cartItems[i] && _cartItems[i]._id === _mobiles[j]._id) {
							$scope.mobiles.splice(j,1);
							//$scope.mobiles.push(_cartItems[i]);
							break;
						}
					}
				};
			}
			console.log(_mobiles);
		});

		$scope.actionSelection = function (evt) {
			$scope.enableMenu = false;
			$scope.add = false;
			$scope.selectedMobile = {};
			$scope.selectedMobileId = $(evt.target).attr("data-id");
			$scope.selectedMobile = mobiles.find(function (x, i) { $scope.selectedMobileIndex = i; return x._id === $scope.selectedMobileId });
			store.setSelectedMobile($scope.selectedMobile);
		}
		$scope.addClick = function () {
			$scope.add = true;
			$scope.selectedMobile = {};
			$scope.selectedMobileId = null;
		}
		$scope.addToCart = function (mobile) {
			if (mobile.isAvailable) {
				console.log(mobile)
				if (mobile.isAddedToCart == false) mobile.isAddedToCart = true;
				$scope.cartItems.push(mobile);
				store.setCartItem(mobile);
				mobile.addedItemCount += 1;
			}
		}
		$scope.removeFromCart = function (mobile) {
			if (mobile.isAvailable) {
				if (mobile.isAddedToCart == false) mobile.isAddedToCart = true;
				if ($scope.cartItems.length > 0 && mobile.addedItemCount > 0) {
					$scope.cartItems.length -= 1;
					mobile.addedItemCount -= 1;
					if (mobile.addedItemCount == 0)
						mobile.isAddedToCart = false;
				} else {
					mobile.isAddedToCart = false;
				}

			}
		}
		$scope.showCart = function () {
			$location.path('/showcart');
		}
		$scope.addMobile = function () {
			var obj = {
				"address": $scope.selectedMobile.address,
				"colors": $scope.selectedMobile.colors,
				"company": $scope.selectedMobile.company,
				"description": $scope.selectedMobile.description,
				"discountedPrice": $scope.selectedMobile.discountedPrice,
				"features": {
					"bettery": ($scope.selectedMobile.features) ? $scope.selectedMobile.features.bettery : undefined,
					"camera": {
						"front": ($scope.selectedMobile.features && $scope.selectedMobile.features.camera) ? $scope.selectedMobile.features.camera.front : undefined,
						"rear:": ($scope.selectedMobile.features && $scope.selectedMobile.features.camera) ? $scope.selectedMobile.features.camera.rear : undefined,
					},
					"display": ($scope.selectedMobile.features) ? $scope.selectedMobile.features.display : undefined,
					"opratingSystem": ($scope.selectedMobile.features) ? $scope.selectedMobile.features.opratingSystem : undefined,
					"ram": ($scope.selectedMobile.features) ? $scope.selectedMobile.features.ram : undefined,
					"rom": ($scope.selectedMobile.features) ? $scope.selectedMobile.features.rom : undefined,
				},
				"isAvailable": $scope.selectedMobile.isAvailable == 'true' ? true : false,
				"manufecturedDate": $scope.selectedMobile.manufecturedDate,
				"modalName": $scope.selectedMobile.modalName,
				"picture": $scope.selectedMobile.picture,
				"price": $scope.selectedMobile.price,
				"ratings": $scope.selectedMobile.ratings,
				"warrenty": $scope.selectedMobile.warrenty,
				"_id": Math.random().toString(36)
			}
			$scope.mobiles.push(obj);
			$scope.selectedMobile = {};
		}
		$scope.updateMobile = function () {
			$scope.selectedMobile.isAvailable = $scope.selectedMobile.isAvailable == 'true' ? true : false;
			$scope.enableMenu = false;
			$scope.selectedMobileId = null;
			$scope.selectedMobile = null;
		}

		$scope.deleteMobile = function () {
			$scope.mobiles.splice($scope.selectedMobileIndex, 1);
			$scope.enableMenu = false;
		}

		$scope.removeMobile = function (mobile) {
			store.delete(mobile);
		};
	});
