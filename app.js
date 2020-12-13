const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {

    const port = 4000;
    /////////// initialize server
    const server = Hapi.server({
        port: port,
        host: 'localhost',
        routes: {
            cors: true
        }
    });
    /////////// Routes 
    server.route(routes);
    /////////// start server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};


init();