'use strict';

// Example route
module.exports = function( req, res ) {
    res.send( 'example route -- ' + req.params.route );
};