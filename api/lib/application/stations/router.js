import { stationsController } from './controller.js';

const stationsRouter = {
    name: 'stations',
    register: async function(server) {
        server.route([
            {
                method: 'GET',
                path: '/stations',
                handler: stationsController.list,
            },
            {
                method: 'GET',
                path: '/stations/{id}',
                handler: stationsController.get,
            },
        ]);
    },
};

export { stationsRouter };