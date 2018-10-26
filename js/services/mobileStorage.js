/*global angular */

/**
 * Services that persists and retrieves mobiles from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('mobileMVC')
	.factory('mobileStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('./js/services/data.json')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	})

	.factory('api', function ($http) {
		'use strict';

		var store = {
			mobiles: [],

			get: function () {
				return $http.get('./js/services/data.json')
					.then(function (resp) {
						angular.copy(resp.data, store.mobiles);
						return store.mobiles;
					});
			},

			/* put: function (mobile) {
				var originalMobiles = store.mobiles.slice(0);

				return $http.put('./js/services/data.json' + mobile.id, mobile)
					.then(function success() {
						return store.mobiles;
					}, function error() {
						angular.copy(originalMobiles, store.mobiles);
						return originalMobiles;
					});
			} */
		};

		return store;
	});