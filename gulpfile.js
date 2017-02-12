var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// source and distribution folder
var source = 'src/';
var dest = 'build/';

// Tasks
var common = function() {
    // Css
    gulp.src(source + 'sass/*.scss')
    .pipe(sass({ includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets/'] }))
    .pipe(gulp.dest(dest + 'css/'));

    // Js
    gulp.src(source + 'js/*.js')
    .pipe(babel())
    .pipe(gulp.dest(dest + 'js/'));

    // Img
    gulp.src(source + 'img/**')
    .pipe(gulp.dest(dest + 'img/'));
};

// For firefox
gulp.task('firefox', function() {
    dest = 'build/firefox/';
    common();

    gulp.src(source + 'browser/firefox/*.html')
    .pipe(gulp.dest(dest));

    gulp.src(source + 'browser/firefox/*.js')
    .pipe(gulp.dest(dest + 'js/'));

    gulp.src(source + 'browser/firefox/manifest.json')
    .pipe(gulp.dest(dest));
});

// For chrome
gulp.task('chrome', function() {
    dest = 'build/chrome/';
    common();

    gulp.src(source + 'browser/chrome/*.html')
    .pipe(gulp.dest(dest));

    gulp.src(source + 'browser/chrome/*.js')
    .pipe(gulp.dest(dest + 'js/'));

    gulp.src(source + 'browser/chrome/manifest.json')
    .pipe(gulp.dest(dest));
});

// For edge
gulp.task('edge', function() {
    dest = 'build/edge/';
    common();

    gulp.src(source + 'browser/edge/*.html')
    .pipe(gulp.dest(dest));

    gulp.src(source + 'browser/edge/*.js')
    .pipe(gulp.dest(dest + 'js/'));

    gulp.src(source + 'browser/edge/manifest.json')
    .pipe(gulp.dest(dest));
});

// For safari
gulp.task('safari', function() {
    dest = 'build/safari.safariextension/';
    common();

    gulp.src(source + 'browser/safari/*.html')
    .pipe(gulp.dest(dest));

    gulp.src(source + 'browser/safari/*.js')
    .pipe(gulp.dest(dest + 'js/'));

    gulp.src(source + 'browser/safari/Info.plist')
    .pipe(gulp.dest(dest));
});

// Default task / build
gulp.task('default', [ 'chrome', 'firefox', 'edge', 'safari' ]);
