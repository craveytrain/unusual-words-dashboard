import Hapi from 'hapi';
import inert from 'inert';
import Good from 'good';

const server = new Hapi.Server();
server.connection( { port: 8080 } );

server.register(inert, (err) => {

    if (err) throw err;

    server.route( {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file('./src/public/index.html');
        }
    } );
} );

server.register( {
    register: Good,
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
}, (err) => {
    if (err) throw err; // something bad happened loading the plugin

    server.start( err => {

        if ( err ) throw err; //something failed with the server starting up

        server.log('info', 'Server running at: ' + server.info.uri);
    });
} );
