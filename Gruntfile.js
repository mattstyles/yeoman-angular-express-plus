'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var colors = require('colors');

module.exports = function (grunt) {

    // Include helpers
    var utils   = require( './grunt/utils' ).init( grunt );
    var helpers = require( './grunt/helpers' ).init( grunt );
    var jsonMin = require( './json-minify/minify.json.js');

    // Create jshint file // @todo move to helper/utils
    grunt.file.write( '.jshint', jsonMin.JSON.minify( grunt.file.read( '.jshintrc' ) ) );

    // ------------------------------------------------------
    // --
    // --   Meta
    // --
    // ------------------------------------------------------

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-booty');

    // configurable paths
    var appConfig = grunt.file.readJSON( 'app-config.json' ) || {};
    var yeomanConfig = {
        app: appConfig.appPath || 'app',
        dist: appConfig.distPath || 'dist'
    };

    // ------------------------------------------------------
    // --
    // --   Task Config
    // --
    // ------------------------------------------------------

    grunt.initConfig({

        yeoman: yeomanConfig,
        banner: '/* <%= appConfig.info.name %> - version <%= appConfig.info.version %> - ' +
                '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
                '<%= appConfig.info.description %>\n ' +
                '&#169 <%= grunt.template.today("yyyy") %> <%= appConfig.info.author.name %> ' +
                '- <%= appConfig.info.author.email %> */\n',

        /*
         * Watch and Reload Tasks
         */

        watch: {
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            },
            less: {
            	files: [
            		'<%= yeoman.app %>/styles/less/*.less'
            	],
            	tasks: ['less:dev']
            }
        },

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },

        /*
         * Testing Tasks
         */

        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        /*
         * Preparatory Tasks
         */

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            css: {
                files: [{
                    src: [
                        '<%= yeoman.app %>/styles/bootstrap/*',
                        '<%= yeoman.app %>/styles/font-awesome/*',
                        '<%= yeoman.app %>/styles/font/*',
                        '<%= yeoman.app %>/styles/fonts/*',
                        '<%= yeoman.app %>/styles/css/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        jshint: {
            options: {
                jshintrc: '.jshint'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },

        concat: {
            options: {
                banner: '<% banner %>'
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '.tmp/scripts/{,*/}*.js',
                        '<%= yeoman.app %>/scripts/{,*/}*.js'
                    ]
                }
            }
        },

        booty: {
            dev: {
                options: {
                    componentPath: '<%= yeoman.app %>/components/',
                    dest: '<%= yeoman.app %>/styles/'
                }
            }
        },

        less: {
            dev: {
                options: {
                    paths: ["<%= yeoman.app %>/styles/less/"]
                },
                files: {
                    "<%= yeoman.app %>/styles/css/main.css": "<%= yeoman.app %>/styles/less/*.less"
                }
            },
            dist: {
                options: {
                    paths: ["<%= yeoman.app %>/styles/less/"],
                    yuicompress: true
                },
                files: {
                    "<%= yeoman.dist %>/styles/css/main-min.css": "<%= yeoman.app %>/styles/less/*.less"
                }
            }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        /*
         * Minification Tasks
         */

        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },

        imagemin: {
            options: {

            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/css/main-min.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                  /*removeCommentsFromCDATA: true,
                  // https://github.com/yeoman/grunt-usemin/issues/44
                  //collapseWhitespace: true,
                  collapseBooleanAttributes: true,
                  removeAttributeQuotes: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Angular minify
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },

        uglify: {
            options: {
                banner: '<% banner %>'
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },

        /*
         * Misc Tasks
         */

        // Replaces scripts with references to Google CDN
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Adds a content hash to bust cache
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/css/*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/font/*',
                        '<%= yeoman.dist %>/styles/fonts/**/*'
                    ]
                }
            }
        },

        // Copy over other stuff
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/**/*',
                        'styles/font/*',
                        'styles/css/*'
                    ]
                }]
            }
        }

    });


    // ------------------------------------------------------
    // --
    // --   Tasks
    // --
    // ------------------------------------------------------

    // Rename tasks
    grunt.renameTask('regarde', 'watch');

    /*
     * Server
     *
     * Starts the development server and watch task
     */
    utils.registerTask(
        'server',
        'Starts a development server and watch task',
        [   'clean:server',
            'less:dev',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch' ],
        { "test option" : "this is a test string" }
    );


    /*
     * Test
     *
     * Cleans stuff up and runs Karma test suite
     */
    utils.registerTask(
        'test',
        'Runs Karma tests',
        [   'clean:server',
            'connect:test',
            'karma' ]
    );

    /*
     * Build
     *
     * Builds the project into dist
     */
    utils.registerTask(
        'build',
        'Builds the project into ' + yeomanConfig.dist,
        [   'clean:dist',
//            'jshint',
            'test',
            'useminPrepare',
            'imagemin',
            'cssmin',
            'htmlmin',
            'concat',
            'copy',
            'cdnify',
            'ngmin',
            'uglify',
//            'rev',
            'usemin',
            'less:dist'
        ]
    );

    /*
     * Bootstrap
     *
     * Cleans the css directory and copies over stuff for bootstrap and font-awesome
     * Note that this currently does not use the extra stuff in font-awesome-more
     * It also won't build less files into main.css either - for now use `grunt less:dev`
     */
    utils.registerTask(
        'bootstrap',
        'Copies bootstrap and font-awesome from bower install to working directory and builds main.less',
        [   'clean:css',
            'booty',
            'less:dev'
        ]
    );

    /*
     * Default Grunt Task
     *
     * Just runs build for now
     */
    utils.registerTask(
        'default',
        'Alias for the build task',
        [   'build'  ]
    );
};
