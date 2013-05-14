'use strict';

describe( 'Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module( 'yoAngularExpressTestApp' ) );

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function( $controller, $rootScope ) {
        scope = $rootScope.$new();
        MainCtrl = $controller( 'MainCtrl', {
            $scope: scope
        });
    }));

    it( 'should attach a list of awesomeClientThings to the scope', function() {
        expect( scope.awesomeClientThings.length ).toBe( 8 );
    } );

    it( 'should attach a list of awesomeServerThings to the scope', function() {
        expect( scope.awesomeServerThings.length ).toBe( 4 );
    } );
} );
