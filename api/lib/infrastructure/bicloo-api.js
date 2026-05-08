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

async function fetchStations() {
    const response = await fetch(`${API_URL}?limit=${STATION_LIMIT}`);

    if (!response.ok) {
        throw Boom.serverUnavailable(messages.errors.api.unavailable(response.status));
    }

    return response.json();
}

export async function getStations() {
    const data = await fetchStations();
        return data.results.map(formatStation);
}

export async function getStationById(id) {
    const stations = await getStations();
    const station = stations.find((station) => station.id === id);

    if (!station) {
        throw Boom.notFound(messages.errors.station.notFound(id));
    }

    return station;
}

