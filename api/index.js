import 'dotenv/config';
import { createServer } from './server.js';
import process from "process";
import {messages} from "./lib/shared/i18n/fr.js";

let server;

const start = async function() {
    server = await createServer();
    await server.start();
    console.log(messages.server.started(server.info.uri))

};

async function exitOnSignal(signal) {
    console.log(messages.server.signal(signal))
    console.log(messages.server.stopping)
    await server.stop({ timeout: 10000 });
    console.log(messages.server.stopped)
    process.exit(0);
}

process.on('SIGTERM', async () => exitOnSignal('SIGTERM'));
process.on('SIGINT', async () => exitOnSignal('SIGINT'));

try {
    await start();
} catch (error) {
    console.error(error);
    throw error;
}