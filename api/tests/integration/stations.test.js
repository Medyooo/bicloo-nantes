import { expect } from 'chai';
import nock from 'nock';
import { createServer } from '../../server.js';
import { FAKE_STATION_OPEN } from '../fixtures/stations.js';
import {messages} from "../../lib/shared/i18n/fr.js";

const API_HOST = 'https://data.nantesmetropole.fr';
const API_PATH = '/api/explore/v2.1/catalog/datasets/244400404_bicloo-disponibilite-temps-reel/records';

describe('GET /stations', function() {

    let server;

    beforeEach(async function() {
        server = await createServer();
    });

    it('retourne 200 avec la liste des stations au format JSON:API', async function() {
        nock(API_HOST)
            .get(API_PATH)
            .query({ limit: 100 })
            .reply(200, { results: [FAKE_STATION_OPEN] });

        const response = await server.inject({
            method: 'GET',
            url: '/stations',
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result).to.have.property('data');
        expect(response.result.data).to.be.an('array');
        expect(response.result.data[0]).to.have.property('id');
        expect(response.result.data[0]).to.have.property('type');
        expect(response.result.data[0]).to.have.property('attributes');
        expect(response.result.data[0].type).to.equal('station');
        expect(response.result.data[0].attributes.name).to.equal('Commerce');
    });

    it('retourne 503 si l\'API est indisponible', async function() {
        nock(API_HOST)
            .get(API_PATH)
            .query({ limit: 100 })
            .reply(500);

        const response = await server.inject({
            method: 'GET',
            url: '/stations',
        });

         expect(response.statusCode).to.equal(503);
        expect(response.result.message).to.equal(
            messages.errors.api.unavailable(500)
        );
    });

    it('retourne 200 avec le détail d\'une station au format JSON:API', async function() {
        nock(API_HOST)
            .get(API_PATH)
            .query({ limit: 100 })
            .reply(200, { results: [FAKE_STATION_OPEN] });

        const response = await server.inject({
            method: 'GET',
            url: '/stations/1',
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result).to.have.property('data');
        expect(response.result.data.id).to.equal('1');
        expect(response.result.data.type).to.equal('station');
        expect(response.result.data.attributes.name).to.equal('Commerce');
    });

    it('retourne 404 si la station n\'existe pas', async function() {
        nock(API_HOST)
            .get(API_PATH)
            .query({ limit: 100 })
            .reply(200, { results: [FAKE_STATION_OPEN] });

        const response = await server.inject({
            method: 'GET',
            url: '/stations/999',
        });

        expect(response.statusCode).to.equal(404);
        expect(response.result.message).to.equal(
            messages.errors.station.notFound(999)
        );
    });
});