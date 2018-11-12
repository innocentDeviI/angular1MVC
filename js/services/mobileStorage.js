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
				if (mobile.isAvailable) {
					if (mobile.isAddedToCart == false) mobile.isAddedToCart = true;{
						mobile.addedItemCount += 1;
						this.cartItems.push(mobile);
					}
				}
			},
			getCartItems: function() {
				return this.cartItems;
			},
			updateCart: function(updatedCart) {
				this.cartItems = [];
				return this.cartItems = updatedCart;
			},
			removeCartItem: function(mobile) {
				var self = this.cartItems;
				var itemsTobeRemoved = [];
				self.find(function(item, i){ 
					if(item && item._id) {
						if(item._id === mobile._id) {
							itemsTobeRemoved.push(i);
							if (item.isAvailable) {
								if (item.isAddedToCart == false) item.isAddedToCart = true;
								if (self.length > 0 && item.addedItemCount > 0) {
									item.addedItemCount -= 1;
									if (item.addedItemCount == 0)
									item.isAddedToCart = false;
								} else {
									item.isAddedToCart = false;
								}
							}
						}
					}
				});
				for(var i=itemsTobeRemoved.length -1 ;i >=0; i--) {
					self.splice(itemsTobeRemoved[i],1);
					break;
				}
				//this.cartItems = self;
				console.log(this.cartItems)
			},
			get: function () {
				return $http.get('../../angular1MVC/js/services/data.json')
					.then(function (resp) {
						if(store.mobiles.length == 0)
						angular.copy(resp.data, store.mobiles);
						return store.mobiles;
					});
			}
		};

		return store;
	});