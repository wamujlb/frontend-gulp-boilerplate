const path = require('path');

module.exports = {
    entry: './frontend/js/main',

    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'public/js'),
    },

    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(__dirname, 'frontend'),
            loader: 'babel-loader?presets[]=es2015'
        }]
    },

    devtool: 'cheap-eval-source-map',
    
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    }
};