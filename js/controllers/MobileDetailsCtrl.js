angular.module('mobileMVC')
    .controller('MobileDetailsCtrl', function MobileDetailsCtrl($scope, $routeParams, store) {
        'use strict';
        console.log(store)
        $scope.mobileId = $routeParams;
        $scope.selectedMobile = store;
    });