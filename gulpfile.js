var gulp = require('gulp');
const uglify = require('gulp-uglify');
var bump = require('gulp-bump');
const sass = require('gulp-sass')(require('sass'));
var babel = require("gulp-babel");

gulp.task('js',['bump','directive','sidebar','mixin'], function () {
    return gulp.src('./bin/*.js') // read all
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('./lib'));
});

gulp.task('directive', function () {
    return gulp.src('./bin/directive/*.js') // read all
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('./lib/directive'));
});

gulp.task('mixin', function () {
    return gulp.src('./bin/mixin/*.js') // read all
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('./lib/mixin'));
});
gulp.task('sidebarViewCss', function () {
    return gulp.src('./bin/sidebar/*.scss') // read all
        .pipe(sass())
        .pipe(gulp.dest('./lib/sidebar'));
});
gulp.task('sidebarView', function () {
    return gulp.src('./bin/sidebar/*.vue') // read all
        .pipe(gulp.dest('./lib/sidebar'));
});
gulp.task('ffButton', function () {
    return gulp.src('./bin/ffButton/*.vue') // read all
        .pipe(gulp.dest('./lib/ffButton'));
});
gulp.task('menuImport', function () {
    return gulp.src('./bin/menuImport/*.vue') // read all
        .pipe(gulp.dest('./lib/menuImport'));
});
gulp.task('sidebar',['sidebarView','sidebarViewCss','ffButton','menuImport'], function () {
    return gulp.src('./bin/sidebar/*.js') // read all
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('./lib/sidebar'));
});

gulp.task('bump',function(){
    return gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});


gulp.task('default', ['js'])
