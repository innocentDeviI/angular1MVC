/*global angular */

/**
 * The main mobileMVC app module
 *
 * @type {angular.Module}
 */
angular.module('mobileMVC', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'MobileCtrl',
			templateUrl: './js/views/mobileList.html',
			resolve: {
				store: function (mobileStorage) {
					// Get the correct module (API or localStorage).
					return mobileStorage.then(function (module) {
						module.get(); // Fetch the mobiles records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:id', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
