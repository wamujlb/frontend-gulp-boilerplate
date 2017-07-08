// ********* //
// ********* Create SVG Sprite ********* //
// ********* //

'use strict';

// ********* load required plugins with '$. = gulp-*'
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const combine = require('stream-combiner2').obj;

module.exports = function (options) {

    return function () {
        return combine(
            gulp.src(options.src),
            svgSprite({
                mode: {
                    css: {
                        dest: '.',
                        bust: false,
                        sprite: 'svgSprite.svg',
                        layout: 'vertical',
                        dimensions: true,
                        bust: false,
                        render: {
                            scss: {
                                dest: '_svgSprite.scss'
                            }
                        }
                    }
                }
            }),
            $.if('*.scss', gulp.dest('frontend/sass/particles'), gulp.dest(options.dst))
        )
    };

};