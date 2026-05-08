import {getStationById, getStations} from '../../infrastructure/bicloo-api.js';

export const stationsController = {

    async list(request, h) {
        const stations = await getStations();
        return h.response(stations).code(200);
    },

    async get(request, h) {
        const id = parseInt(request.params.id);
        const station = await getStationById(id);
        return h.response(station).code(200);
    },

};

