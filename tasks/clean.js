/*
 * Clean public directory
 */

const del = require('del');

module.exports = function(options){

    return function(){
        return del(options.dst);
    };

};
