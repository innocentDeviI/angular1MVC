angular.module('mobileMVC')
	.factory('mobileStorage', function ($http, $injector) {
		'use strict';

		return $http.get('../../angular1MVC/js/services/data.json')
			.then(function () {
				return $injector.get('api');
			});
	})

	.factory('api', function ($http) {
		'use strict';

		var store = {
			mobiles: [],
			cartItems: [],
			selectedMobile: {},
			setSelectedMobile: function(object) {
				this.selectedMobile = object;
			},
			getSelectedMobile: function() {
				return this.selectedMobile;
			},
			setCartItem: function(mobile) {
				this.cartItems.push(mobile);
			},
			getCartItems: function() {
				return this.cartItems;
			},
			get: function () {
				return $http.get('../../angular1MVC/js/services/data.json')
					.then(function (resp) {
						angular.copy(resp.data, store.mobiles);
						return store.mobiles;
					});
			}
		};

		return store;
	});