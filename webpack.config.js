const path = require('path');
const webpack = require( 'webpack' );
const config = require('./src/config');

module.exports = {
    entry: [
      'whatwg-fetch',
      './src/index'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [ 'babel' ]
            }
        ]
    },
    resolve: {
        extensions: [ '', '.js' ]
    },
    output: {
        path: path.resolve( __dirname, 'dest', 'static' ),
        publicPath: 'static',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        hot: true,
        port: config.env.development.static.port,
        host: 'localhost'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
  ]
};
