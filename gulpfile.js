var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch        = require('gulp-watch');
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var concat       = require('gulp-concat');
var flatten      = require('gulp-flatten');
var bower        = require('gulp-bower');
var clean        = require('gulp-clean');
var lr           = require('tiny-lr');
var server       = lr();

// Places things are
var paths = {
  scripts: ['app/**/*.js', 'app/**/*.jsx'],
  styles: ['bower_components/**/*.css', 'app/assets/styles/*.scss'],
  build: 'build/modules'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts, {read: false})
    .pipe(livereload(server));
});

gulp.task('clean-styles', function () {
  return gulp.src(['build/css/app.css'], {read: false})
    .pipe(clean());
});

gulp.task('compile-bower', function() {
  return gulp.src(paths.styles[0])
    .pipe(flatten())
    .pipe(gulp.dest('build/css/1_bower'));
});

gulp.task('compile-sass', function() {
  return gulp.src(paths.styles[1])
    .pipe(plumber())
    .pipe(flatten())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('build/css/2_app'));
});

gulp.task('styles', ['clean-styles', 'compile-bower', 'compile-sass'], function() {
  return gulp.src('build/css/**/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(livereload(server));
});

gulp.task('watch', ['lr-server'], function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('lr-server', function(cb) {
  server.listen(35729, cb);
});

gulp.task('default', [
  'scripts',
  'styles'
]);
