/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the mobileStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('mobileMVC')
	.controller('MobileCtrl', function MobileCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var mobiles = $scope.mobiles = store.mobiles;

		$scope.newMobile = '';
		$scope.editedMobile = null;
		$scope.enableMenu = false;
		$scope.selectedMobile = {};
		$scope.cartItemsCount = 0;

		/* $scope.$watch('mobiles', function () {
			$scope.remainingCount = $filter('filter')(mobiles, { completed: false }).length;
			$scope.completedCount = mobiles.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true); */

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});

		$scope.actionSelection = function (evt) {
			$scope.enableMenu = false;
			$scope.add = false;
			$scope.selectedMobile = {};
			$scope.selectedMobileId = $(evt.target).attr("data-id");
			$scope.selectedMobile = mobiles.find(function (x, i) { $scope.selectedMobileIndex = i; return x._id === $scope.selectedMobileId });
		}
		$scope.addClick = function () {
			$scope.add = true;
			$scope.selectedMobile = {};
			$scope.selectedMobileId = null;
		}
		$scope.addToCart= function(mobile) {
			if(mobile.isAvailable) {
				if( mobile.isAddedToCart == false ) mobile.isAddedToCart = true;
				$scope.cartItemsCount += 1;
				mobile.addedItemCount += 1;
			}
		}
		$scope.removeFromCart= function(mobile) {
			if(mobile.isAvailable) {
				if( mobile.isAddedToCart == false ) mobile.isAddedToCart = true;
				if($scope.cartItemsCount > 0 && mobile.addedItemCount > 0) {
					$scope.cartItemsCount -= 1;
					mobile.addedItemCount -= 1;
					if(mobile.addedItemCount == 0)
						mobile.isAddedToCart = false;	
				} else {
					mobile.isAddedToCart = false;
				}

			}
		}
		$scope.showCart = function() {
			
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
