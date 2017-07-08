// ********* //
// ********* Copy assets folder to public ********* //
// ********* //

'use strict';

const gulp = require('gulp');
const del = require('del');
const combine = require('stream-combiner2').obj;

module.exports = function(options){

    return function(){
        return combine(
            gulp.src(options.src),
            gulp.dest(options.dst)
        )
    };

};
