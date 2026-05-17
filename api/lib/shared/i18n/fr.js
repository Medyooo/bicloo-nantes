export const messages = {
    errors: {
        api: {
            unavailable: (status) => `Erreur API Bicloo : ${status}`,
            invalidUrl: 'URL de l\'API invalide',
            missingUrl: 'Variable d\'environnement BICLOO_API_URL non définie',
            networkFailure: 'Impossible de joindre l\'API Open Data (réseau ou URL).',
            invalidPayload: 'Réponse de l\'API Open Data invalide ou incomplète.',
        },
        station: {
            notFound: (id) => `Station ${id} introuvable`,
        }
    },
    server: {
        started: (uri) => `Serveur démarré sur ${uri}`,
        stopped: 'Serveur arrêté proprement',
        signal: (signal) => `Signal reçu : ${signal}`,
        stopping: 'Arrêt du serveur...',
    }
}