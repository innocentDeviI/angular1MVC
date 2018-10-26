angular.module('mobileMVC')
    .directive('modals', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "./js/views/modals.html";

    directive.scope = {
        modal: '=',
        selectedMobile: '=selectedmobile',
        deleteMobile: '&delete',
        updateMobile: '&update',
        addMobile: '&add',
        addflag: '='
    }
    directive.compile = function (element, attributes) {
        element.css("border", 0);
    }

    return directive;
});