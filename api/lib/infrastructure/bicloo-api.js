import fetch from 'node-fetch';
import process from 'process';
import { messages } from '../shared/i18n/fr.js';
import Boom from '@hapi/boom';

const API_URL = process.env.BICLOO_API_URL;
const STATION_LIMIT = 100;

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function formatStation(record) {
    const availableBikes = Number(record.available_bikes) || 0;
    const availableBikeStands = Number(record.available_bike_stands) || 0;

    return {
        id: String(record.number),
        attributes: {
            lastUpdate: record.last_update ?? null,
            name: formatName(record.name),
            address: record.address ?? null,
            availableBikes,
            availableBikeStands,
            bikeStands: Number(record.bike_stands) || 0,
            rentalMethods: record.rental_methods ?? null,
            position: record.position ?? null,
            isOpen: availableBikes > 0 || availableBikeStands > 0,
        },
    };
}

function serializeStation(station) {
    return {
        id: station.id,
        type: 'station',
        attributes: station.attributes,
    };
}

async function fetchStations() {
    const response = await fetch(`${API_URL}?limit=${STATION_LIMIT}`);

    if (!response.ok) {
        throw Boom.serverUnavailable(
            messages.errors.api.unavailable(response.status)
        );
    }

    return response.json();
}

export async function getStations() {
    const data = await fetchStations();
    const stations = data.results
        .filter((record) => record.name && record.number)
        .map(formatStation);

    return { data: stations.map(serializeStation) };
}

export async function getStationById(id) {
    const result = await getStations();
    const station = result.data.find((station) => station.id === String(id));

    if (!station) {
        throw Boom.notFound(messages.errors.station.notFound(id));
    }

    return { data: station };
}