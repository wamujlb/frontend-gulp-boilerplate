// ********* //
// ********* Merger all JSON templates into one ********* //
// ********* //

const gulp = require('gulp');
const merge = require('gulp-merge-json');
const combine = require('stream-combiner2').obj;

module.exports = function(options){

    return function(){
        return combine(
            gulp.src(options.src),
            merge({
                fileName: 'templateData.json',
            }),
            gulp.dest(options.dst)
        )
    };

};
