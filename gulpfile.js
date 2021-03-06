var del        = require('del');
var gulp       = require('gulp');
var concat     = require('gulp-concat');
var browserify = require('gulp-browserify');

gulp.task('clean', function(cb) {
    return del('www');
    cb();
});

gulp.task('publish', function() {
    gulp.src('src/js/main.js')
        .pipe( browserify({transform:'reactify'}) )
        .pipe( concat('main.js') )
        .pipe( gulp.dest('www/js') );

    gulp.src('src/index.html')
        .pipe( gulp.dest('www'));

    gulp.src('src/images/*')
        .pipe( gulp.dest('www/images'));

    gulp.src('src/fonts/*')
        .pipe( gulp.dest('www/fonts'));

    gulp.src('src/css/*')
        .pipe( gulp.dest('www/css'));

    gulp.src('src/js/vendors/**/*.*')
        .pipe( gulp.dest('www/js/vendors/'));

});

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['publish']);
});

gulp.task('build', ['clean','publish']);

gulp.task('default', ['build'] );
