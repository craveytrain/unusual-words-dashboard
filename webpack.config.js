const path = require('path');
const webpack = require( 'webpack' );
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
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
        path: path.resolve( __dirname, 'dest' ),
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './src/public',
        inline: true,
        hot: true,
        port: 8080,
        host: 'localhost'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new TransferWebpackPlugin(
            [
                { from: 'public' },
            ],
            path.resolve( __dirname, 'src' )
        ),
  ]
};
