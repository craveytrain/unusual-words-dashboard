require('dotenv').config();
import 'babel-polyfill';
import Hapi from 'hapi';
import config from './config';
import websocket from './websocket-server';
import makeStore from './store';

const server = new Hapi.Server();
const env = process.env.NODE_ENV || 'development';

const store = makeStore();

server.connection( { port: process.env.PORT || config.servers.web[env].port } );

const io = websocket( server.listener, store );

 const plugins = [
    { register: require( 'inert' ) }, // enables serving static files (file and directory handlers)
    { register: require( 'h2o2' ) },
    {
        register: require( 'good' ),
        options: {
            reporters: {
                console: [ {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [ {
                        response: '*',
                        log: '*'
                    } ]
                },
                {
                    module: 'good-console'
                },
                'stdout']
            }
        }
    }
];

server.register(plugins, err => {
    if (err) throw err; // something bad happened loading the plugins

    server.route( {
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
            reply.file('./src/public/index.html');
        }
    } );

    // Proxy webpack assets requests to webpack-dev-server in dev mode. serve up static files in production mode.
    // Note: in development webpack bundles are served from memory, not filesystem
    server.route( {
        method: 'GET',
        path: '/static/' + '{path*}', // this includes HMR patches, not just webpack bundle files
        handler: env === 'production' ? {
            directory: {
                path: './dest/static',
                redirectToSlash: true,
                index: true
            }
        } : {
            proxy: {
                host: 'localhost',
                port: config.servers.static.port,
                passThrough: true
            }
        }
    } );

    server.route( {
        method: 'GET',
        path: '/public/' + '{path*}',
        handler: {
            directory: {
                path: './src/public',
                redirectToSlash: true,
                index: true
            }
        }
    } );

    server.start( err => {
        if ( err ) throw err; //something failed with the server starting up

        server.log('info', `Server running in ${env} mode at ${server.info.uri}`);
    } );
} );
