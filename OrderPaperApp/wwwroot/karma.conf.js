// Karma configuration
// Generated on Sat Oct 08 2016 20:41:29 GMT+1300 (New Zealand Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],

        // list of files / patterns to load in the browser
        files: [
            // Polyfills.
            'node_modules/es6-shim/es6-shim.js',
            
            'node_modules/reflect-metadata/Reflect.js',
            
            // System.js for module loading
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            
            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            //jquery
            'content/scripts/vendors/jquery-1.12.4.min.js',
            //spin
            'content/scripts/vendors/spin.min.js',
            // RxJs.
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            { pattern: 'karma-test-shim.js', included: true, watched: true },
            { pattern: 'built/test/*-test.js', included: true, watched: true },
            // paths loaded via module imports
            // Angular itself
            { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
            { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true },
            
            // Our built application code
            { pattern: 'built/**/*.js', included: false, watched: true },

            // paths to support debugging with source maps in dev tools
            { pattern: 'app/**/*.ts', included: false, watched: false },
            { pattern: 'built/**/*.js.map', included: false, watched: false }
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'built/**/*.js': ['browserify']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            "/built/":  "/base/built/",
            "/app/":    "/base/app/"
        },
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        htmlReporter: {
            outputFile: 'built/test/test-results.html'
        }
    })
}
