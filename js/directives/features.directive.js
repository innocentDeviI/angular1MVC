angular.module('mobileMVC')
    .directive('features', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.templateUrl = "../../excercises/angular1MVC/js/views/featuresTable.html";

    directive.scope = {
        mobile: "=modal"
    }

    directive.compile = function (element, attributes) {
        element.css("border", 0);
    }

    return directive;
});