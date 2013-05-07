# Yeoman-Angular-Express-Plus

> Project seed for a Yeoman generated angular app with an
express/socket.io backend and some extra goodies

## How to get the goodies

Javascript is great.  Lots and lots of lovely javascript.  Celebrate javascript with a stack full of
goodies.

_Love Javascript?_

_Love Yeoman?_

_Love Node?_

Why not put them all together?

Follow these steps to bubble the JS cauldron:

* `git clone git@github.com:mattstyles/yeoman-angular-express-plus path/to/directory`

* `cd path/to/directory`

* `git co client`

* `npm install` - to install grunt and grunt stuff

* `grunt server`

## Detailed instructions

```bash
git clone git@github.com:mattstyles/yeoman-angular-express-plus path/to/directory
cd path/to/directory
```

Clone the base repository from master into your new project at `path/to/directory` and then `cd` into it.

```bash
git checkout client-angular-bootstrap
```

Change the repository to the `ui-bootstrap` branch which contains the goodies just for the client-side.  This needs
to be done before running a build of this seed - the install task (by running `grunt`) will remove the link to
the remote so change branches first.

```bash
npm install
```

This step is necessary for installing [Grunt](www.gruntjs.com).  Grunt should be installed locally but this
`npm install` step will ensure that all of the development dependencies are included alongside.

```bash
grunt dev
```

Now fire off a development build.  There is quite a lot going on in the Gruntfile so have a good poke around
to see what it can do.  `Grunt dev` (or `grunt server`) will run the install task the first time the repository
is cloned.  The install task will remove the link to this seed repository so that you can link to your own `git`
powered repository.

