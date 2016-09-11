import Server from 'socket.io';

module.exports = function startServer( webserver, store ) {
    const io = new Server().attach( webserver );

    store.subscribe(() => {
        io.emit( 'state', store.getState() );

    } );

    io.on('connection', socket => {
        socket.emit( 'state', store.getState() );
        socket.on('action', store.dispatch.bind( store ) );
    });
}
