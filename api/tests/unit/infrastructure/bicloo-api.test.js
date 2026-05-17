import { expect } from 'chai';
import nock from 'nock';
import { getStations } from '../../../lib/infrastructure/bicloo-api.js';
import { messages } from '../../../lib/shared/i18n/fr.js';
import {
    FAKE_STATION_AVAILABLE,
    FAKE_STATION_UNAVAILABLE,
} from '../../fixtures/stations.js';

const API_HOST = 'https://data.nantesmetropole.fr';
const API_PATH =
    '/api/explore/v2.1/catalog/datasets/244400404_disponibilite-temps-reel-velos-libre-service-naolib-nantes-metropole/records';

afterEach(function () {
    nock.cleanAll();
});

describe('BiclooApi', function () {
    describe('#getStations', function () {
        it('retourne une liste de stations formatées', async function () {
            nock(API_HOST)
                .get(API_PATH)
                .query(true)
                .reply(200, { results: [FAKE_STATION_AVAILABLE] });

            const stations = await getStations();

            expect(stations.data).to.be.an('array');
            expect(stations.data[0].attributes.name).to.equal('Commerce');
            expect(stations.data[0].attributes.lastUpdate).to.equal(
                FAKE_STATION_AVAILABLE.last_update,
            );
            expect(stations.data[0].attributes.availableBikes).to.equal(8);
            expect(stations.data[0].attributes.availableBikeStands).to.equal(4);
            expect(stations.data[0].attributes.isOpen).to.equal(true);
        });

        it('lance une erreur si l\'API est indisponible', async function () {
            nock(API_HOST)
                .get(API_PATH)
                .query(true)
                .reply(500);

            try {
                await getStations();
                expect.fail('Devrait lancer une erreur');
            } catch (error) {
                expect(error.message).to.include(
                    messages.errors.api.unavailable(500),
                );
            }
        });

        it('retourne un tableau vide si aucune station', async function () {
            nock(API_HOST)
                .get(API_PATH)
                .query(true)
                .reply(200, { results: [] });

            const stations = await getStations();

            expect(stations.data).to.be.an('array');
            expect(stations.data).to.have.length(0);
        });

        it('isOpen est faux si aucun vélo ni place disponible', async function () {
            nock(API_HOST)
                .get(API_PATH)
                .query(true)
                .reply(200, { results: [FAKE_STATION_UNAVAILABLE] });

            const stations = await getStations();

            expect(stations.data[0].attributes.isOpen).to.equal(false);
        });
    });
});
