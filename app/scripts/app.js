'use strict';

angular.module( 'yoAngularExpressTestApp', [ 'ui.bootstrap', 'btford.socket-io' ])
    .config( [ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider ) {
        $routeProvider
        .when( '/', {
            // @todo fix this
            templateUrl: 'scripts/main/mainView.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode( true );
    }]);
