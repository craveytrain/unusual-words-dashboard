const path = require('path');
const webpack = require( 'webpack' );
const config = require('./src/config');
const Dotenv = require('dotenv-webpack');

const plugins = [ new webpack.HotModuleReplacementPlugin() ];

if (process.env.NODE_ENV === 'production') {
    plugins.push( new webpack.DefinePlugin( { 'process.env.AUTH0_CLIENT_ID': JSON.stringify( process.env.AUTH0_CLIENT_ID ) } ) );
    plugins.push( new webpack.DefinePlugin( { 'process.env.AUTH0_DOMAIN': JSON.stringify( process.env.AUTH0_DOMAIN ) } ) );
} else {
    plugins.push( new Dotenv() );
}

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
    plugins: plugins
};
