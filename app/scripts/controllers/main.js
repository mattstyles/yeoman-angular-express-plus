'use strict';

angular.module('yoAngularExpressTestApp')
    .controller('MainCtrl', function ($scope) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            'jQuery',
            'UI-Bootstrap',
            'Font-Awesome',
            'Modernizr',
            'Underscore'
        ];

        $scope.isCollapsed = true;

        $scope.collapseText = "Open";

        $scope.collapseIcon = "icon-chevron-down";

        $scope.collapse = function() {
            $scope.isCollapsed = !$scope.isCollapsed;

            $scope.isCollapsed ? $scope.collapseText = "Open" : $scope.collapseText = "Close";
            $scope.isCollapsed ? $scope.collapseIcon = "icon-chevron-down" : $scope.collapseIcon = "icon-chevron-up";
        };

    });
