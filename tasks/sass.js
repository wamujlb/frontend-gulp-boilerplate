// ********* //
// ********* SASS ********* //
// ********* //

'use strict';

const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

// ********* init compass
const compass = require('compass-importer');

// ********* load required plugins with '$. = gulp-*'
const $ = require('gulp-load-plugins')();

// ********* check "isDevelopment" say gulp not make some pipes // command for using   NODE_ENV=production gulp sass
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

module.exports = function(options){

    return function(){
        return combine(
            gulp.src(options.src),
            $.if(isDevelopment, $.sourcemaps.init()),
            $.sass({ importer: compass }),
            $.if(isDevelopment, $.sourcemaps.write()),
            gulp.dest(options.dst)
        ).on('error', $.notify.onError());
    };

};