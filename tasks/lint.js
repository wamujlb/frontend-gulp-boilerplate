// ********* //
// ********* JS Lint ********* //
// ********* //

'use strict';

// ********* load required plugins with '$. = gulp-*' / automatic load required plugins
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const eslint = require('gulp-eslint');
const path = require('path');
const through2 = require('through2').obj;
const fs = require('fs');


module.exports = function(options){

    return function(){

        // Промежуточный объект для того, чтобы запомнить все файлы
        let eslintResults = {};

        // create cache for all my files
        let cacheFilePath = process.cwd() + '/tmp/lintcache.json';

        try {
            eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
        } catch (e){
        }

        return gulp.src(options.src, {read: false})
            .pipe($.debug({title: 'src'}))
            .pipe($.if(
                function(file) {
                    return eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
                },
                through2(function (file, enc, callback) {
                    file.eslint = eslintResults[file.path].eslint;
                    callback();
                }),
                combine(
                    through2(function(file, enc, callback){
                        file.contents = fs.readFileSync(file.path);
                        callback(null, file);
                    }),
                    eslint(),
                    $.debug({title: 'eslint'}),
                    through2(function(file, enc, callback){
                        eslintResults[file.path] = {
                            eslint: file.eslint,
                            mtime: file.stat.mtime
                        };
                        callback(null, file);
                    })
                )
            ))
            .pipe(eslint.format())
            .on('end', function(){
                fs.writeFileSync(cacheFilePath, JSON.stringify(eslintResults));
            });
    };

};