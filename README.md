# Yeoman-Angular-Express-Plus

> Project seed for a Yeoman generated angular app with an
express/socket.io backend and some extra goodies

## How To Get The Goodies

Javascript is great.  Lots and lots of lovely javascript.  Celebrate javascript with a stack full of goodies.

_Love Javascript?_

_Love Yeoman?_

_Love Node?_

Why not put them all together?

Follow these steps to bubble the JS cauldron:

* `git clone git@github.com:mattstyles/yeoman-angular-express-plus path/to/directory`

* `cd path/to/directory`

* `npm install` - to install grunt and grunt stuff

* `grunt server`


## What Goodies Are Included

* [Yeoman](http://yeoman.io/)

* [Grunt](http://gruntjs.com/)

* [Angular](http://angularjs.org/)

* [Karma](http://karma-runner.github.io/0.8/index.html)

* [UI-Bootstrap](http://angular-ui.github.io/bootstrap/)

* [Font-Awesome](http://gregoryloucas.github.io/Fontstrap/)

* [jQuery](http://jquery.com/)

* [Modernizr](http://modernizr.com/)

* [lodash](http://lodash.com/)

* [Express](http://expressjs.com/)

* [Hogan](http://twitter.github.io/hogan.js/)

* [Socket.io](http://socket.io/)

* [MongoDB](http://www.mongodb.org/)

* [Nodejitsu Deploy](https://www.nodejitsu.com/)


## Detailed Include-list

### Yeoman Scaffolding

The seed is built on top of a Yeoman scaffolded Angular app so you get all the juicy scaffolding tools for quickly building controllers, services and routes etc etc etc

Part of the roadmap is to turn this entire seed into a [Yeoman generator](https://github.com/yeoman/generator) that you can build out server side routes and restful API’s alongside your client-side Angular stuff but this is a goal that the Yeoman team are currently working on and will likely achieve so make sure you keep up to date with the [Yeoman](http://yeoman.io) site for developments.

### Bower Integration

The _large_ list of additional goodies are largely installed via [Bower](http://bower.io/) for managing them.

The main point of the seed is to include all these goodies in a nice, trouble-free manner and ensure that the Grunt tasks build them all in to development and production environments in a sensible way.

### Less CSS

_Bootstrap_ and _Font-Awesome_ are installed in their [less](http://lesscss.org/) flavours.  The Grunt tasks compile the less into `/app/styles/main.css` ready for use.

To add the extra fonts in font-awesome-more simply include their files in `main.less`, for example, to include the additional social icons:

```js
@import "../font-awesome-more/font-awesome-social";
```

and the Grunt task will take care of the rest.

### Grunt Extras

There is quite a lot going on in the Gruntfile.  The best way to learn about it is to use `grunt -h`.  On top of the stuff that you normally get from Grunt when using a Yeoman scaffold you’ll also get:

* all the CSS integrated for you along with a watch task to allow for live reloading of the browser

* an install script which runs on the first build

* better `--help` documentation

* easier set up for linting using commented json and [grunt-jsonmin](https://npmjs.org/package/grunt-jsonmin)

* a banner added to your built, concatenated and minified code that uses information from the app-config file

* aliases for the build and server tasks if you prefer using `grunt dev`, `grunt prod` or `grunt dist`

* a `--skip-tests` option for the `dev` task for when you want to spark up the development server without running your test suite - remember you have a watch task for developing but also remember that watch task won’t lint or run your tests (these will be done before you try and commit to git though)

* `--open` and `--use` tasks for making sure that your production build is working correctly

* adds a grunt folder for placing an custom utilities or helpers that you need to customise the Gruntfile for the needs of your project.  There’s also an event emitter wrapper function for use with the `grunt-shell` task that runs any `shell` tasks you might need

### Install Script

When you first run `Grunt` after closing from github a quick install script will run to ensure that you get all the dependencies from Bower, removes this seed repository from the remote so that you can add your own remote repository and adds some git hooks to make sure your code is good to commit.

### App-config.json

Most projects require some sort of configuration and it’s often placed in an application config file.  The app-config.json included here is not ignored by git so that it is cloned along with the rest of the repository but there are many use cases where you will want to ignore it from your git repository.

### Different branches

After cloning the project, if you don’t want everything on master (while it’s unlikely it’s possible master will not be stable) then checkout the branch you want before running your install.

__client__

Contains Angular and the other client-side goodies.  Uses Bootstrap JS instead of the UI-Bootstrap Angular versions.  Clone it and use `grunt dev` to have a look at what’s on offer.

__client-angular-bootstrap__

Contains Angular and all the client-side goodies and uses the Angular versions of the bootstrap interactive elements.  Check out the [client-side usage example](#usage-example).

__express__

Backs the Angular client-side shizzle with a little express server out the back, ready to be extended.

__express-hogan__

Adds [Hogan.js](http://twitter.github.io/hogan.js/) into the server side mix.  Can serve hogan templates or raw html.

__sockets__

Adds [socket.io](http://socket.io/) support to connect client and server.

__jitsu__

Adds a `deploy` task to the gruntfile that pushes a deploy of your built code straight to nodejitsu.  Just add a subdomain to the `package.json` and use `grunt build --deploy` after running a build to deploy your code.

__mongo__

Adds a [mongo](http://www.mongodb.org/) database to the back end and organises the server code better.


## Detailed Usage Instructions

```bash
git clone git@github.com:mattstyles/yeoman-angular-express-plus path/to/directory
cd path/to/directory
```

Clone the base repository from master into your new project at `path/to/directory` and then `cd` into it.

```bash
git checkout branch
```

Checkout the branch that contains the seed you want your project to start with. This needs to be done before running a build of this seed - the install task (by running `grunt`) will remove the link to the remote so change branches first.

```bash
npm install
```

This step is necessary for installing [Grunt](www.gruntjs.com).  Grunt should be installed locally but this `npm install` step will ensure that all of the development dependencies are included alongside.

```bash
grunt dev
```

Now fire off a development build.  There is quite a lot going on in the Gruntfile so have a good poke around to see what it can do or use `grunt -h` for some information on the tasks.  `Grunt dev` (or `grunt server`) will run the install task the first time the repository is cloned.  The install task will remove the link to this seed repository so that you can link to your own `git` powered repository.

Once the development server is sparked up you should see the base app (which lists the _goodies_ you know have control over) and a watch task will be running so get creating something awesome.


## Usage Example

### Client-side project with UI-Bootstrap

[UI-Bootstrap](http://angular-ui.github.io/bootstrap/) is a project that contains [Angular](http://angularjs.org/)
implementations of [Bootstrap Goodies](http://twitter.github.io/bootstrap/).  This repository contains a seed for starting a client-side project with UI-Bootstrap in the `client-angular-bootstrap` branch so let’s see how easy it is to get a project on it’s feet.

```bash
git clone git@github.com:mattstyles/yeoman-angular-express-plus awesome-project
cd awesome-project
git checkout client-angular-bootstrap
npm install
grunt dev
```

These commands clone the repository into `/awesome-project/`, install the dependencies required for [Grunt](www.gruntjs.com)
and then run the `dev` task to install the project and open up a server and watch task for immediately starting development on _awesome-project_.

At this stage you have full control of `git` but the install task has stripped the remote so you are no longer tied to the seed repository and should register your own remote.  Create a new repository in github and add it as a remote.

```bash
git remote add origin git https://github.com/username/awesome-project.git
```

If you haven’t still got the watch task running then fire it back up with `grunt dev --skip-tests` (you don’t need to run the tests again), if the watch task is still running then let’s just get cracking with adding a new feature.

As an example of using some of the features included in the seed we’ll create a quick modal box (example taken straight from the [UI-Bootstrap docs](http://angular-ui.github.io/bootstrap/#modal)).  Open up `/app/views/main.html` in your editor and add the following to the bottom:

```html
<div ng-controller="ModalDemoCtrl">
    <button class="btn" ng-click="open()">Open me!</button>
    <div modal="shouldBeOpen" close="close()" options="opts">
        <div class="modal-header">
            <h4>I'm a modal!</h4>
        </div>
        <div class="modal-body">
            <ul>
                <li ng-repeat="item in items">{{item}}</li>
            </ul>
        </div>
        <div class="modal-footer">
            <button class="btn btn-warning cancel" ng-click="close()">Cancel</button>
        </div>
    </div>
</div>
```

If you have a quick look at your handiwork in the browser you should be seeing that the the watch task has spotted the change to your view and reloaded the browser.  We need to create a controller to go with that view so let’s let [Yeoman](http://yeoman.io/) do it’s thing and create a controller for us:

```bash
yo angular:controller ModalDemoCtrl --minsafe
```

The `--minsafe` flag is not required because the `grunt build` task uses `ngmin` so it’s up to you whether you want Yeoman to scaffold annotated components or not.

Check out the live reload of your browser, things are looking good and we’ve lost that console error.  Yeoman has scaffolded us out a controller in `/app/scripts/controllers/ModalDemo.js` and also created a quick test for us.

Following along with [test-driven development](http://www.agiledata.org/essays/tdd.html) we’ll start developing this new feature with a test.  Open up `/test/spec/controllers/ModalDemo.js` and replace the test function (`it`) at the bottom with this test (below is the whole file):

```js
'use strict';

describe('Controller: ModalDemoCtrl', function () {

    // load the controller's module
    beforeEach(module('yoAngularExpressTestApp'));

    var ModalDemoCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ModalDemoCtrl = $controller('ModalDemoCtrl', {
            $scope: scope
        });
    }));

    it('should open the modal', function () {
        scope.open();
        expect(scope.shouldBeOpen).toBe(true);
    });
});
```

Hardly an exhaustive test but it serves as an illustration.  Run `grunt test` and, as expected, the test fails.  Add some code to the controller `/app/scripts/controllers/ModalDemo.js` to pass that test:

```js
'use strict';

angular.module('yoAngularExpressTestApp')
    .controller('ModalDemoCtrl', [ '$scope', function ($scope) {

        $scope.open = function () {
            $scope.shouldBeOpen = true;
        };

        $scope.close = function () {
            $scope.closeMsg = 'I was closed at: ' + new Date();
            $scope.shouldBeOpen = false;
        };

        $scope.items = ['item1', 'item2'];

        $scope.opts = {
            backdropFade: true,
            dialogFade:true
        };

    }]);
```

Now run `grunt test` again and have a look at your browser.  The test should now pass and the browser should have reloaded to leave you with a fully operational modal, all in a few minutes.

Something that the watch task doesn’t do is lint your code so you could either run `grunt lint` to just perform the linting task or get the project ready for production.  Go ahead kill the watch task and run `grunt prod --use` to create a production-ready version of the project and have a look at it in the browser.

All should be good, if you haven’t been adding your commits to git then do that now:

```bash
git add .
git commit -m 'Added modal dialog box'
git push
```

The destination folder for `grunt prod` is defined in `app-config.json`.  Now go and create more awesome stuff and remember that in addition to the powers of Yeoman, UI-Bootstrap and Grunt you’ve also got access to Modernizr, Underscore, jQuery, more Angular goodies and font-awesome icons.

* * *

[@veryfizzyjelly](https://twitter.com/veryfizzyjelly)
