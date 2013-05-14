'use strict';

angular.module( 'yoAngularExpressTestApp' )
    .controller( 'MainCtrl', [ '$scope', 'socket', '$location', '$window', function( $scope, socket, $location, $window ) {

        $scope.awesomeClientThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            'jQuery',
            'UI-Bootstrap',
            'Font-Awesome',
            'Modernizr',
            'lodash',
        ];

        $scope.awesomeServerThings = [
            'Express',
            'Hogan',
            'Socket.io',
            'MongoDB'
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

        $scope.connectedClass = 'icon-remove';
        $scope.connected = 'Not Connected to Server';

        socket.on( 'send:onConnect', function( data ) {
            $scope.connected = data.data;
            $scope.connectedClass = 'icon-link';
        } );

        $scope.socketExample = function() {
            console.log('sending event to socket');
            socket.emit( 'send:example', {
                data: 'example'
            } );
        };

        $scope.socketText = 'Hit the button';

        socket.on( 'send:example', function( data ) {
            console.log('client socket on');
            $scope.socketText = data.data;
        } );

        $scope.redirect = function( path ) {
            console.log('attempting to redirect to ' + path );
//            $location.path( path );
            $window.location.href = path;
        };
    }]);
