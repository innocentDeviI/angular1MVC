angular.module('mobileMVC')
    .controller('MobileDetailsCtrl', function MobileDetailsCtrl($scope, $routeParams, store) {
        'use strict';
        $scope.mobileId = $routeParams;
        $scope.selectedMobile = store;
    });