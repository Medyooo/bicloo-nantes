'use strict';

const Hapi = require('@hapi/hapi');

const createServer = async function (){
    const server = new Hapi.Server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: function () {
            return{ status: 200 };
        },
    });

    return server;
};

const startServer = async function(){
    const server = await createServer();
    await server.start();
    console.log('Serveur démarré sur ${server.info.uri}`');
    return server;
};

module.exports = {startServer, createServer};

if (require.main === module) {
    startServer();
}