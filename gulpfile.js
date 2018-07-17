'use strict';

const gulp  = require('gulp'),
pug         = require('gulp-pug'),
stylus      = require('gulp-stylus'),
plumber     = require('gulp-plumber'),
notify      = require('gulp-notify'),
cssmin      = require('gulp-cssmin'),
uglify      = require('gulp-uglify'),
browserSync = require('browser-sync').create();

const path = {
  src: {
    html: 'src/pug/index.pug',
    css: 'src/stylus/main.styl',
    js: 'src/js/main.js'
  },
  dist: {
    html: 'dist/',
    css: 'dist/css/',
    js: 'dist/js/'
  },
  watch: {
    html: 'src/pug/**/*.pug',
    css: 'src/stylus/**/*.styl',
    js: 'src/js/**/*.js'
  }
};

gulp.task('webserver', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  })
  gulp.watch(path.watch.html, ['pug']);
  gulp.watch(path.watch.css, ['stylus']);
  gulp.watch(path.watch.js, ['js']);
});

gulp.task('pug', function(callback) {
  return gulp.src(path.src.html)
  .pipe(plumber({errorHandler: notify.onError(function(err) {
    return {
      title: 'PUG ERROR!!!',
      message: err.message
    }
  })}))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(path.dist.html))
  .pipe(browserSync.stream())
  callback();
});

gulp.task('stylus', function(callback) {
  return gulp.src(path.src.css)
  .pipe(plumber({errorHandler: notify.onError(function(err) {
    return {
      title: 'STYLUS ERROR!!!',
      message: err.message
    }
  })}))
  .pipe(stylus())
  .pipe(cssmin())
  .pipe(gulp.dest(path.dist.css))
  .pipe(browserSync.stream())
  callback();
});

gulp.task('js', function(callback) {
  return gulp.src(path.src.js)
  .pipe(plumber({errorHandler: notify.onError(function(err) {
    return {
      title: 'JS ERROR!!!',
      message: err.message
    }
  })}))
  .pipe(uglify())
  .pipe(gulp.dest(path.dist.js))
  .pipe(browserSync.stream())
  callback();
});

gulp.task('default', ['webserver']);
