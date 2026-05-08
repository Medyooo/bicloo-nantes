import { expect } from 'chai';
import nock from 'nock';
import { getStations } from '../../../lib/infrastructure/bicloo-api.js';
import { messages } from '../../../lib/shared/i18n/fr.js';
import {FAKE_STATION_OPEN, FAKE_STATION_CLOSED } from '../../fixtures/stations.js';

const API_HOST = 'https://data.nantesmetropole.fr';
const API_PATH = '/api/explore/v2.1/catalog/datasets/244400404_bicloo-disponibilite-temps-reel/records';

afterEach(function() {
    nock.cleanAll();
});

describe('BiclooApi', function() {

    describe('#getStations', function() {

        it('retourne une liste de stations formatées', async function() {
            nock(API_HOST)
                .get(API_PATH)
                .query({ limit: 100 })
                .reply(200, { results: [FAKE_STATION_OPEN] });

            const stations = await getStations();

            expect(stations).to.be.an('array');
            expect(stations[0].name).to.equal('Commerce');
            expect(stations[0].availableBikes).to.equal(8);
            expect(stations[0].availablePlaces).to.equal(4);
            expect(stations[0].isOpen).to.equal(true);
        });

        it('lance une erreur si l\'API est indisponible', async function() {
            nock(API_HOST)
                .get(API_PATH)
                .query({ limit: 100 })
                .reply(500);

            try {
                await getStations();
                expect.fail('Devrait lancer une erreur');
            } catch (error) {
                expect(error.message).to.include(
                    messages.errors.api.unavailable(500)
                );
            }
        });

        it('retourne un tableau vide si aucune station', async function() {
            nock(API_HOST)
                .get(API_PATH)
                .query({ limit: 100 })
                .reply(200, { results: [] });

            const stations = await getStations();

            expect(stations).to.be.an('array');
            expect(stations).to.have.length(0);
        });

        it('formate correctement une station fermée', async function() {
            nock(API_HOST)
                .get(API_PATH)
                .query({ limit: 100 })
                .reply(200, { results: [FAKE_STATION_CLOSED] });

            const stations = await getStations();

            expect(stations[0].isOpen).to.equal(false);
        });

        it('formate correctement le nom en title case', async function() {
            nock(API_HOST)
                .get(API_PATH)
                .query({ limit: 100 })
                .reply(200, {
                    results: [{ ...FAKE_STATION_OPEN, name: 'GARE SNCF' }]
                });

            const stations = await getStations();

            expect(stations[0].name).to.equal('Gare sncf');
        });

    });

});