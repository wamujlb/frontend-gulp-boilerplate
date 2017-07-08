'use strict';

// ********* load Gulp required tasks
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const path = require('path');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const gulplog = require('gulplog');
const $ = require('gulp-load-plugins')();

// ********* check "isDevelopment" say gulp not make some pipes // command for using   NODE_ENV=production gulp sass
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

// ********* Helpful function for gulp tasks
function requireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);

        return task(callback);
    })
}

// ********* webpack
gulp.task('webpack', function() {
    return gulp.src('frontend/js/*.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('public/js'));
});


// ********* Sass task
requireTask('sass', './tasks/sass', {
    src: 'frontend/sass/screen.scss',
    dst: 'public/css'
});

// ********* Compass task
requireTask('compass', './tasks/compass', {
    src: 'frontend/sass/screen.scss',
    sassSrc: 'frontend/sass',
    cssSrc: 'public/css'
});

// ********* mergeJson task
requireTask('mergeJson', './tasks/mergeJson', {
    src: 'frontend/templates/data/partials/*.json',
    dst: 'frontend/templates/data/'
});

// ********* hb task
requireTask('hb', './tasks/hb', {
    src: 'frontend/templates/pages/*.hbs',
    structure: 'frontend/templates/structure',
    components: 'frontend/templates/components',
    data: 'frontend/templates/data/templateData.json',
    dst: 'public'
});

// ********* Clean task
requireTask('clean', './tasks/clean', {
    dst: 'public'
});

// ********* Assets task
requireTask('assets', './tasks/assets', {
    src: 'frontend/assets/**',
    dst: 'public'
});

// ********* svg-sprite task
requireTask('svgSprite', './tasks/svgSprite', {
    src: 'frontend/files/icons/**/*.svg',
    dst: 'public/css'
});

// ********* lint task
requireTask('lint', './tasks/lint', {
    src: 'frontend/**/*.js'
});

// ********* watch task
gulp.task('watch', function () {

    gulp.watch('frontend/sass/**/*.*', gulp.series('sass'));
    gulp.watch('frontend/assets/**', gulp.series('assets'));
    gulp.watch('frontend/files/icons/**/*.svg', gulp.series('svgSprite'));
    gulp.watch('frontend/templates/data/partials/*.json', gulp.series('mergeJson'));
    gulp.watch('frontend/templates/**/*.{hbs,js,json}', gulp.series('hb'));
    gulp.watch('frontend/**/*.{js,json,jsx}', gulp.series('webpack'));

});

// ********* serve task
requireTask('serve', './tasks/serve', {
    server: 'public',
    dst: 'public/**/*.*'
});

// ********* Build task create
gulp.task('build', gulp.series(
    'clean', 'mergeJson',
    gulp.parallel('svgSprite', 'sass', 'hb', 'webpack'),
    'assets')
);

// ********* Gulp dev
gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);
