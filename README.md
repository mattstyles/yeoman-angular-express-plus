# yo-angular-express-test

How to install:
`npm install generator-angular generator-karma`
`yo angular`
_added README.md_
_removed coffee and compass from grunt_
_deleted .htaccess_
`bower install bootstrap font-awesome-more --save`
`npm install grunt-contrib-less --save-dev`
_added appPath to component.json_

> _sort out gruntfile - add contrib-less to sort out bootstrap and font-awesome_
> _sort out gruntfile - added addition tasks to build bootstrap and build bootstrap with font-awesome_

_replaced these two steps by using grunt-booty to build in the css_
`npm install grunt-booty --save-dev`

_Gruntfile line 216 - created main.css within dist/styles/css/main.css_ - minifies into css/main.css
_organise gruntfile and change code styles_
_add utils and helpers to gruntfile_
_add registerTask function to utils - to better explain what is happening in the gruntfile_
_add app-config.json to help set up the project_

_minor alterations to .editorconfig - changing code styles_
`bower install jquery --save`       -- this now does 2.0.0
`bower install underscore --save`
`bower install modernizr --save`
`bower install angular-socket-io --save`
`bower install socket.io-client --save`

_add scripts to index.html_
_added minified underscore_
_added bootstrap files and using usemin to mush em up into bootstrap-min for the prod build_
_added angular-socket-io to the mix_
_smashed in socket.io for angular-socket-io_
_made sure that 2.0.0 of jQuery is used_

_massively updated hinting structure_


__still to do__
change .jshintrc to more comprehensive coverage of the what to lint -- DONE (see notes)
linting is currently turned off, sort out spacing and turn it back on
fix grunt rev task to add content hash correctly to
remove all the yeomanConfig shit and just move it to app-config -- DONE (but maintaining yeoman, to make
  it obvious we are using yeoman to scaffold stuff)
allow gruntfile to add package info (from app-config) to minified files -- HALF-DONE (included but does
  not work)
add options to grunt (i.e. --skip-tests etc)
live reload should watch less files and recompile them into css on the fly -- DONE (and its shweeeet)
add a grunt util that sticks a banner on the top of built files (i.e. main.css, scripts.js etc)

* sort out link to css/main.css because the build process changes the link to main.css which breaks the
font locations -- DONE
Currently includes both main.css and main-min.css which I'm not mad keen on but the prod build does not
reference the main.css anyway.  Minification doesn't gain a whole heap anyway but it's about in keeping
with what bootstrap offer if you download minified code (its heavier due to font-awesome)

sort out the grunt build task to ensure that the dist build does the css correctly - DONE
add a git pre-commit hook that lints code before committing
add sockets.io to client-side -- need to make sure the hooks are working good -- blocked behind server
express.io and server-side


## Build log

* CSS stuff done.  Need to bower install bootstrap and font-awesome-more and then `grunt bootstrap` will build them
into the /styles/ directory.  The boilerplate /styles/less/main.less imports bootstrap, bootstrap-responsive and
font-awesome (not all of font-awesome-more although its there if needed) - this file can be built into /styles/css/
using `grunt less:dev`.  (this is now using grunt-booty, still need grunt-contrib-less to build the css)
Then hit up `grunt server` to start a server for the dev build and bootstrap and font-awesome are ready for use.

* Added helpers and utils.  Currently they have just tidied up the registration of tasks for better documentation of
how to start using the gruntfile included here.
Also changed the grunt setup to include app-config.json and use that to configure yeoman.

* cssmin goes into css/main.css in the prod build rather than just main.css to maintain the file structure and therefore
keep the paths to the fonts correct. prod build uses usemin to change to
using main-min.css

* stripped out copying all the shit over and just using `grunt booty` to do it.

* Added package.json style info to the appConfig to use in a banner but it doesnt work right and doesnt get added to the
css or the scripts.

* Created an involved .jshintrc and found a way of stripping the comments out of the json and creating a file (.jshint)
that will then be parsed by the jshint task.  Works great.  Attribution required for minify.json (https://github.com/getify/JSON.minify)
and created .jshint should be moved out to a utility or helper function.  Also need attribution for .jshintrc example
file and about my additions which basically ensure that it is the same conditions as the yeoman generated jshint config
but changes the indentation level.

* Added extra condition to the watch task that looks for a change to the less and then recompiles.  That recompile
changes the css which is watched by the first watch task which then reloads the browser.  BOOM!
