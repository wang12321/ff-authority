var gulp = require('gulp');
const uglify = require('gulp-uglify');
var bump = require('gulp-bump');

gulp.task('js',['bump','directive','sidebar','mixin'], function () {
    return gulp.src('./bin/*.js') // read all
        .pipe(uglify())
        .pipe(gulp.dest('./lib'));
});

gulp.task('directive', function () {
    return gulp.src('./bin/directive/*.js') // read all
        .pipe(uglify())
        .pipe(gulp.dest('./lib/directive'));
});

gulp.task('mixin', function () {
    return gulp.src('./bin/mixin/*.js') // read all
        .pipe(uglify())
        .pipe(gulp.dest('./lib/mixin'));
});
gulp.task('sidebarViewCss', function () {
    return gulp.src('./bin/sidebar/*.scss') // read all
        .pipe(gulp.dest('./lib/sidebar'));
});
gulp.task('sidebarView', function () {
    return gulp.src('./bin/sidebar/*.vue') // read all
        .pipe(gulp.dest('./lib/sidebar'));
});
gulp.task('sidebar',['sidebarView','sidebarViewCss'], function () {
    return gulp.src('./bin/sidebar/*.js') // read all
        .pipe(uglify())
        .pipe(gulp.dest('./lib/sidebar'));
});

gulp.task('bump',function(){
    return gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump',function(){
    return gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});
gulp.task('default', ['js'])
