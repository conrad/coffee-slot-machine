'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
var clean = require('rimraf');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var assets = useref.assets();
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var wiredep = require('wiredep').stream;
var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');


// the paths to our app files
var paths = {
  // not including 3rd party js files
  scripts: ['app/**/*.js'],
  html: ['app/**/*.html', 'client/index.html'],
  styles: ['app/styles/main.css'],
  server: ['server/**/*.js'],
  sass: ['app/styles/**/*.scss']
};


gulp.task('install', shell.task([
  'npm install',
  'bower install'
]));

gulp.task('clean', function (cb) {
  clean('dist', cb);
});

gulp.task('lint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe(sass({
      precision: 10
    }))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('uglify', function () {
  return gulp.src('app/scripts/*.js')
    // .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('minify', function () {
  return gulp.src('app/styles/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/styles'));
});


gulp.task('images', function () {
  return gulp.src('app/assets/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('fonts', function () {
  return gulp.src('app/styles/fonts/*')
    .pipe(gulp.dest('dist/styles/fonts'));
});

gulp.task('move', function () {
  return gulp.src('app/bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('icons', function () {
  return gulp.src('app/assets/icons/*')
    .pipe(gulp.dest('dist/assets/icons'));
});

gulp.task('html', ['styles'], function () {

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('wiredep', function () {

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('connect', function () {
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('app'))
        .use(serveIndex('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000.');
        });
});

gulp.task('serve', ['styles', 'connect'], function () {

    livereload.listen();

    require('opn')('http://localhost:9000');

    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/assets/**/*'
    ]).on('change', livereload.changed);
    
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('deploy', ['html', 'images', 'icons', 'fonts', 'move']);

gulp.task('build', ['lint', 'html', 'images', 'icons', 'fonts', 'move'], function() {
  gulp.start('uglify');
  gulp.start('minify');
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

