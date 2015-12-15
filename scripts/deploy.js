const gulp = require('gulp');
const gprint = require('gulp-print');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src(['./dist/**/*'])
    .pipe(ghPages())
    .pipe(gprint());
});

gulp.start('deploy');
