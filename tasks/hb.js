// ********* //
// ********* Compile Handlebars templates with JSON to HTML ********* //
// ********* //

'use strict';

// ********* load required plugins with '$. = gulp-*'
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const fs = require('fs');

module.exports = function(options){

    return function(){

        let templateData = function() {
                return JSON.parse(fs.readFileSync(options.data));
            },
            hbOptions = {
                batch : [options.components, options.structure]
            };

        return combine(
            gulp.src(options.src),
                $.data(templateData),
                $.compileHandlebars(null, hbOptions),
                $.rename({
                    extname: '.html'
                }),
                gulp.dest(options.dst)
        )

    };

};




