/* jshint node: true */
'use strict';

var cleancss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  debug = require('gulp-debug'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  order = require('gulp-order'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  webserver = require('gulp-webserver');

gulp.task('styles', function() {
  return gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/font-awesome.css',
      'custom_assets/scss/fun-with-hugo.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(order([
      'normalize.css',
      'bootstrap.css',
      'font-awesome.css',
      'fun-with-hugo.scss'
    ]))
    .pipe(concat('main.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('static/assets/css'));
});

gulp.task('fonts', function() {
  return gulp.src([
      'node_modules/font-awesome/fonts/**/*',
    ])
    .pipe(gulp.dest('static/assets/fonts'));

});

gulp.task('scripts', function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'custom_assets/js/fun-with-hugo.js'
    ])
    .pipe(order([
      'jquery.js',
      'fun-with-hugo.js'
    ]))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/assets/js'));
});

gulp.task('jshint', function() {
  return gulp.src('custom_assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('custom_assets/js/*.js', ['lint', 'scripts']);
  gulp.watch('custom_assets/scss/*.scss', ['styles']);
});

// Default (Build) Task
gulp.task('default', ['jshint', 'styles', 'scripts', 'fonts', 'watch']);