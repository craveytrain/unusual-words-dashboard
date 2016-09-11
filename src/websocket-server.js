import Server from 'socket.io';
import config from './config';

module.exports = function startServer( store ) {
    const io = new Server().attach( config.servers.websocket.port );

    store.subscribe(() => {
        io.emit( 'state', store.getState() );

    } );

    io.on('connection', socket => {
        socket.emit( 'state', store.getState() );
        socket.on('action', store.dispatch.bind( store ) );
    });

    console.log( `Websocket server running at ${config.servers.websocket.port}` );
}
