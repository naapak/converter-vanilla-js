
var gulp = require("gulp");
var uglifycss = require("gulp-uglifycss");
const uglify = require('gulp-uglifyjs')
var renam = require('gulp-rename');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var watchLess = require('gulp-watch-less');

gulp.task('sass', function () {
     gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(concat('app.scss'))
    .pipe(renam("stylesmini.css"))
    .pipe(uglifycss({
      "maxLineLen": 100000,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/css'))
});



gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});
