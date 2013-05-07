'use strict';

angular.module('yoAngularExpressTestApp')
    .controller('MainCtrl', ['$scope', function ($scope) {

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

        $scope.collapseText = 'Open';

        $scope.collapseIcon = 'icon-chevron-down';

        $scope.collapse = function() {
            $scope.isCollapsed = !$scope.isCollapsed;

            if ($scope.isCollapsed) {
                $scope.collapseText = 'Open';
                $scope.collapseIcon = 'icon-chevron-down';
            } else {
                $scope.collapseText = 'Close';
                $scope.collapseIcon = 'icon-chevron-up';
            }
        };

    }]);
