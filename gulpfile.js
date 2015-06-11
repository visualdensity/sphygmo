var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe( browserify({transform:'reactify'}) )
        .pipe( concat('main.js') )
        .pipe( gulp.dest('www/js') );
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
        .pipe( gulp.dest('www'));

    gulp.src('src/images')
        .pipe( gulp.dest('www'));

    gulp.src('src/fonts')
        .pipe( gulp.dest('www'));

    gulp.src('src/css')
        .pipe( gulp.dest('www'));
});

gulp.task('publish', ['browserify','copy']);

gulp.task('default', function() {} );
