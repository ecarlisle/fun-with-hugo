/* jshint node: true */
'use strict';

var cleancss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  debug = require('gulp-debug'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  order = require('gulp-order'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  webserver = require('gulp-webserver');

gulp.task('clean', function() {
  return gulp.src('public', {read: false})
    .pipe(clean('static/**/*'))
    .pipe(shell('hugo'));
});

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

gulp.task('images', function() {
  return gulp.src([
      'custom_assets/img/**/*',
    ])
    .pipe(gulp.dest('static/assets/img/'));
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
    .pipe(gulp.dest('static/assets/js'));
});

gulp.task('jshint', function() {
  return gulp.src('custom_assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('custom_assets/js/*.js', ['jshint', 'scripts']);
  gulp.watch('custom_assets/scss/*.scss', ['styles']);
  gulp.watch('custom_assets/img/**/*', ['images']);
});

// Default (Build) Task
gulp.task('default', ['clean', 'jshint', 'styles', 'scripts', 'images', 'fonts', 'watch']);