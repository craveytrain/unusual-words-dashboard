const path = require('path');
const webpack = require( 'webpack' );
const config = require('./src/config');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        './src/client'
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
        port: config.servers.static.port,
        host: 'localhost'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
    ]
};
