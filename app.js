'use strict';

// Module importieren
const { flaschenpost } = require('flaschenpost');
const { getApi } = require('./lib/getApi');
const http = require('http');
const { InMemoryStore } = require('./lib/store/InMemoryStore');
const { MongoDbStore } = require('./lib/store/MongoDbStore');
const { processenv } = require('processenv');

// AIIFE Asychron Immediately Invoke Function Expression
(async () => {

    // Logger erstellen
    const logger = flaschenpost.getLogger();
    // Store einbinden und initialisieren
    // const store = new InMemoryStore();
    const store = new MongoDbStore({
        hostname: 'localhost',
        port: 27017,
        username: 'node',
        password: 'password',
        database: 'todos'
    });
    await store.initialize();
    // Api einbinden
    const api = getApi({ store });
    // Server erstellen und Api übergeben
    const server = http.createServer(api);
    // Port aus den Umgebungsvariablen auslesen als fallback manuell port 3000 angeben
    const port = processenv('PORT', 3_000);


    // Server auf Port nach verbindungen hören lassen
    server.listen(port, () => {
        logger.info('Server startet', { port });
    });
})();