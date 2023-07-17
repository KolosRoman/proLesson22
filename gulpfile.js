const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const sass = gulpSass(dartSass);



function buildStyles() {
    return gulp.src('./scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss("bundle.css"))
      .pipe(gulp.dest('./dist/css'));
};

function watchStyles() {
    return gulp.watch('./scss/*.scss', buildStyles);
}

function minifyJS() {
    return gulp.src('./src/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
}

function watchMinifyJS() {
    return gulp.watch('./src/*.js', minifyJS);
}

function modeIndexHTML() {
    return gulp.src('./index.html')
      .pipe(gulp.dest('./dist'));
}

function removeDist() {
    return gulp.src('./dist')
        .pipe(clean());
}

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });


    gulp.watch('./scss/*.scss', function() {
        return gulp.src("./scss/*.scss")
            .pipe(sass())
            .pipe(concatCss("bundle.css"))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
    })
    

    gulp.watch('./index.html').on('change', function() {
        gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
    browserSync.reload();
    })

    gulp.watch('./src/*.js', function() {
        return gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());

    })

});

exports.buildStyles = buildStyles;
exports.watchStyles = watchStyles;
exports.minifyJS = minifyJS;
exports.watchMinifyJS = watchMinifyJS;

exports.build = gulp.series(removeDist, modeIndexHTML, gulp.parallel(buildStyles, minifyJS))