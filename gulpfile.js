/*
 *  Gulp File
 */

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    util = require('gulp-util'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    zip = require('gulp-zip'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    fs = require('fs'),
    _ = require('lodash'),
    //stripDebug = require('gulp-strip-debug'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

/* 
 * 
 * Setting the destination browsers for autoprefixer
 *
 */

var DEBUG = false;

var VENDORS_JS_INPUT = [
                            './scripts/lodash-4.11.2.min.js',
                            './scripts/angular.v1.5.7.min.js',
                            './scripts/angular-ui-router.v0.2.18.min.js',
                            './scripts/ui-bootstrap-custom-tpls-1.3.3.min.js',
                            './scripts/angular.ngforce.js',
                            './scripts/ngforce.visualforce.remoting.js',
                            './scripts/ngforce.sf.template.js'
                        ];


var AUTOPREFIXER_BROWSERS = [

    //
    // Official browser support policy:
    // http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
    //
    'Chrome >= 35',
    'Firefox >= 31',
    'Edge >= 12',
    'Explorer >= 9',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12'

];

//sass to css conversion
gulp.task('styles', function () {

    var sassOptions = {
        outputStyle: 'compact', // shall be expanded,nested,compressed
        precision: 8 // changing to 8, as RockFish's precision is 8
    };

    var plumberErrorHandler = function (error) {

        console.log(error.message);
        this.emit('end');
    };

    return gulp.src('scss_files/**/*.scss')

        .pipe(plumber({ errorHandler: plumberErrorHandler }))

        .pipe(sourcemaps.init())

        .pipe(sass(sassOptions))

        .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))

        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('./css'))

        .pipe(browserSync.stream({ match: '**/*.css' }));
});

//main function for browser sync
gulp.task('serve', ['styles'], function () {

    var syncOptions = {
						  server: { baseDir: "./", index: 'index.html' },

        port: 3500,

						  logPrefix: "SCF Sprint 01",

						  browser: ["google chrome", "firefox"],

						  open: true,

						  notify: false
    }

    browserSync.init(syncOptions);


    gulp.watch('scss_files/**/*.scss', ['styles']);

    //gulp.watch('scfapp/**/*.js', [ 'ng:templateCache' ]);

    gulp.watch('scfapp/**/*.js').on("change", browserSync.reload);

    gulp.watch("index.html").on("change", browserSync.reload);
});

//function to copy the required files for sales force bundle creation.
gulp.task('copy:tosf', function () {

    return gulp.src([
                        './css/*.css',
                        './images/**/',
                        './fonts/**/*'
                    ],

        { base: './' }

    )

        .pipe(gulp.dest('./temp'));

});

//Function to clean the build and temp folders before the setup zip creation
gulp.task('clean', function () {

    return del(['build/**/*', 'temp/**/*']);

});

//function to zip the resources and keep it in the destination.
gulp.task('zip:resource', function () {

    return gulp.src('./temp/**/*')

        .pipe(zip('SCF_Resources.zip'))

        .pipe(gulp.dest('./build'));

});

//combine vendor JS files into single
gulp.task('combineJS:vendors', function () {

    return gulp.src(VENDORS_JS_INPUT)

        .pipe(sourcemaps.init())

        .pipe(concat('vendors.bundle.js', { newLine: '\n;' }))

        .pipe(sourcemaps.write('./'))
        
        .pipe(gulp.dest('./temp/scfapp/'));

});

//combine angular modules and controls module wise
gulp.task('combineJS:app', function () {

    var allJs = [
                    './scfapp/scf-routes.config.js',
                    './scfapp/scf-app.module.js',
                    './scfapp/**/*.js'
                 ];

    // var allJs = [
    //                 './dummy/dummy.module.js',
    //                 './dummy/dummy.component.js',
    //                 './dummy/dummy.service.js'
    //             ]

       return gulp.src(allJs)
                  
                  .pipe(concat('scfapp.bundle.js', { newLine: '\n;' }))

                  .pipe(sourcemaps.init())

                  .pipe(uglify({

            output: {
                beautify: DEBUG,
            },

            compress: {
                sequences: !DEBUG,
                booleans: !DEBUG,
                conditionals: !DEBUG,
                hoist_funs: false,
                hoist_vars: DEBUG,
                warnings: DEBUG,
            },

            mangle: !DEBUG
        }))

        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('./temp/scfapp/'));
    
});

gulp.task('ng:tempcache', function () {

    return gulp.src('templates/**/*.html')
               .pipe(templateCache( 'scf.templates.js', { module : 'scf.templates',
                                                          standalone: true,
                                                          root : './templates/'
                                                         } ))
               .pipe(gulp.dest('./temp/scfapp/'));

});

//the start gulp task for sales force build package generation
gulp.task('build', function () {
    

    runSequence(
                    'styles', 
                    'clean',
                    'ng:tempcache',    
                    ['combineJS:vendors', 'combineJS:app'], 
                    'copy:tosf', 
                    'zip:resource'
                );

});

gulp.task('default', ['build']);


// Private functions starts //
/**
 * Function to combine all angular files into their module folder
 */
var setCombineJs = function (module) {

    var folder = './scfapp/' + module + '/';

    var allJs = [
        './scmapp/scf-routes.config.js',
        './scmapp/scf-app.module.js',
        folder + module + '.templates.js',
        folder + 'scf-' + module + '.module.js',
        folder + '**/*.js',
        './scfapp/common/*.js'


    ];

    //util.log(util.colors.bgMagenta(allJs));       

    return gulp.src(allJs)

        .pipe(concat('scfapp-' + module + '.bundle.js', { newLine: '\n;' }))
        
        //.pipe(stripDebug())

        .pipe(uglify({

            output: {
                beautify: DEBUG,
            },

            compress: {
                sequences: !DEBUG,
                booleans: !DEBUG,
                conditionals: !DEBUG,
                hoist_funs: false,
                hoist_vars: DEBUG,
                warnings: DEBUG,
            },

            mangle: !DEBUG
        }))

        .pipe(header(
            fs.readFileSync('app-header.template.txt', 'utf8')
        ))

        .pipe(gulp.dest('./temp/scfapp/'));

}
