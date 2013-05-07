'use strict';

angular.module('yoAngularExpressTestApp', ['ui.bootstrap'])
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

    });
