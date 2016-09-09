import Hapi from 'hapi';

import config from './config';

const server = new Hapi.Server();
server.connection( { port: 3000 } );

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

server.register(plugins, (err) => {
    if (err) throw err; // something bad happened loading the plugins

    server.route( {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file('./src/public/index.html');
        }
    } );

    server.route( {
        method: 'GET',
        path: '/articles', // this includes HMR patches, not just webpack bundle files
        handler: {
            proxy: {
                uri: config.urls.articles
                // host: 'localhost',
                // port: 8080,
                // passThrough: true
            }
        }
    } );

    // DEV SETUP
    if ( process.env.NODE_ENV === 'development' ) {
        // Proxy webpack assets requests to webpack-dev-server
        // Note: in development webpack bundles are served from memory, not filesystem
        server.route( {
            method: 'GET',
            path: '/static/' + '{path*}', // this includes HMR patches, not just webpack bundle files
            handler: {
                proxy: {
                    host: 'localhost',
                    port: 8080,
                    passThrough: true
                }
            }
        } );
    }

    server.start( err => {
        if ( err ) throw err; //something failed with the server starting up

        server.log('info', 'Server running at: ' + server.info.uri);
    } );
} );
