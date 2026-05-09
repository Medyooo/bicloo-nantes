import fetch from 'node-fetch';
import process from 'process';
import { messages } from "../shared/i18n/fr.js";
import Boom from "@hapi/boom";



const API_URL = process.env.BICLOO_API_URL;
const STATION_LIMIT = 100;

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function formatStation(record) {
    return {
        id: record.number,
        name: formatName(record.name),
        availableBikes: record.available_bikes,
        availablePlaces: record.available_bike_stands,
        isOpen: record.status === 'OPEN',
    };
}

function serializeStation(station) {
    return {
        id: String(station.id),
        type: 'station',
        attributes: {
            name: station.name,
            availableBikes: station.availableBikes,
            availablePlaces: station.availablePlaces,
            isOpen: station.isOpen,
        },
    };
}

async function fetchStations() {
    const response = await fetch(`${API_URL}?limit=${STATION_LIMIT}`);

    if (!response.ok) {
        throw Boom.serverUnavailable(messages.errors.api.unavailable(response.status));
    }

    return response.json();
}

export async function getStations() {
    const data = await fetchStations();
    const stations = data.results.map(formatStation);
    return {
        data : stations.map(serializeStation),
    };
}

export async function getStationById(id) {
    const result = await getStations();
    const station = result.data.find((station) => station.id === String(id));

    if (!station) {
        throw Boom.notFound(messages.errors.station.notFound(id));
    }

    return { data: station };
}

