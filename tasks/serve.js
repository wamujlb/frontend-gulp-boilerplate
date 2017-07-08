// ********* //
// ********* Run server browser-sync ********* //
// ********* //

'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');

module.exports = function(options){

    return function(){
        browserSync.init({
            server: options.server
        });

        // browser sync watch
        return browserSync.watch(options.dst).on('change', browserSync.reload);
    };

};