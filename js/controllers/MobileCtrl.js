/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the mobileStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('mobileMVC')
	.controller('MobileCtrl', function MobileCtrl($scope, $routeParams, $location, store) {
		'use strict';
		var mobiles = $scope.mobiles = $scope.mobiles;

		$scope.newMobile = '';
		$scope.editedMobile = null;
		$scope.selectedMobile = {};
		$scope.enableMenu = {};
		$scope.cartItems = store.getCartItems()
		$scope.$on('$viewContentLoaded', function () {
		    mobiles = $scope.mobiles = $scope.mobiles || store.mobiles;

			var _mobiles = $scope.mobiles;
			if(_mobiles.length > 0) {
				var res = $scope.mobiles.map(function(obj) {
					return _mobiles.find(function(o) { 
									return  o._id === obj._id 
									}) || {}
					});
				if(res.length > 0) $scope.mobiles = res;
				console.log($scope.mobiles)
			}
		});
		$scope.moreClick = function(name) {
			if($scope.enableMenu === name){
				$scope.enableMenu = false;
			} else {
				$scope.enableMenu = name;
			}
		}
		$scope.actionSelection = function (evt) {
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
			store.setCartItem(mobile);
		}
		$scope.removeFromCart = function (mobile) {
			store.removeCartItem(mobile);	
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
