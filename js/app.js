/*global angular */

/**
 * The main mobileMVC app module
 *
 * @type {angular.Module}
 */
angular.module('mobileMVC', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
		'use strict';
		$routeProvider
			.when('/', {
				templateUrl: '../../excercises/angular1MVC/js/views/mobileList.html',
				controller: 'MobileCtrl',
				resolve: {
					store: function (mobileStorage) {
						// Get the correct module (API or localStorage).
						return mobileStorage.then(function (module) {
							module.get(); // Fetch the mobiles records in the background.
							return module;
						});
					}
				}
			})
			.when('/mobile/:id', {
				templateUrl: '../../excercises/angular1MVC/js/views/mobileDetails.html',
				controller: 'MobileDetailsCtrl',
				bindings: {
					mobile: '<'
				},
				resolve: {
					store: function (mobileStorage) {
						// Get the correct module (API or localStorage).
						return mobileStorage.then(function (module) {
							return module.getSelectedMobile(); // Fetch the selected mobile records in the background.
						});
					}
				}
			})
			.when('/showcart', {
				templateUrl: '../../excercises/angular1MVC/js/views/cartDetails.html',
				controller: 'cartDetailsCtrl',
				bindings: {
					mobile: '<'
				},
				resolve: {
					/* store: function (mobileStorage) {
						// Get the correct module (API or localStorage).
						return mobileStorage.then(function (module) {
							return module.getSelectedMobile(); // Fetch the selected mobile records in the background.
						});
					} */
				}
			})
			.otherwise({
				redirectTo: '/'
			});

		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
	});
