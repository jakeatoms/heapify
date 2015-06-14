var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    watch = require('gulp-watch');

gulp.task('specs', function () {
  return gulp.src('specs/*.spec*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
  watch(['src/*.js', 'specs/*.spec*.js'], function () {
    gulp.run('specs');
  });
});