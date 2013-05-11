'use strict';

angular.module('yoAngularExpressTestApp', ['ui.bootstrap', 'btford.socket-io'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    });
