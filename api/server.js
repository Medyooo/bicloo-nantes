import Hapi from '@hapi/hapi';
import process from "process";
import {stationsRouter} from "./lib/application/stations/router.js";

const createServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: () => ({ status: 'ok' }),
    });

    await server.register(stationsRouter);

    return server;
};

export { createServer };