export const messages = {
    errors: {
        api: {
            unavailable: (status) => `Erreur API Bicloo : ${status}`,
            invalidUrl: 'URL de l\'API invalide',
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