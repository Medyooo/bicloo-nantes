# bicloo-nantes

Application autour du service de vélos en libre-service **Bicloo** (Nantes) : une **API Node (Hapi)** expose des ressources **JSON:API**, consommées par une **application Ember**.

## Organisation du dépôt

| Dossier        | Rôle                                              |
|----------------|---------------------------------------------------|
| `api/`         | Serveur HTTP, agrégation / normalisation Bicloo |
| `bicloo-app/`  | Frontend Ember (Warp Drive / JSON:API, Vite)     |

Voir aussi [`bicloo-app/README.md`](bicloo-app/README.md) pour le détail des commandes Ember.

## Démarrage rapide

**API** (port `3000` par défaut) :

```bash
cd api
cp .env.example .env   # renseigner BICLOO_API_URL, etc.
npm install
npm start
```

**App** (port `4200` par défaut en dev Ember / Vite) :

```bash
cd bicloo-app
npm install
npm run start
```

En développement, `bicloo-app` appelle par défaut l’API sur `http://localhost:3000` (variable `API_URL` possible). Vérifier [`bicloo-app/config/environment.js`](bicloo-app/config/environment.js).

---

## Flux applicatif

### Séquences (liste et détail)

```mermaid
sequenceDiagram
  autonumber
  actor U as Utilisateur
  participant APP as bicloo-app (Ember + Vite)
  participant RT as Router / routes
  participant ST as Store + JSONAPIAdapter
  participant API as API Hapi (port 3000)
  participant CTL as stationsController
  participant INF as bicloo-api.js
  participant EXT as API Bicloo (BICLOO_API_URL)

  Note over U,EXT: Liste — URL /stations

  U->>APP: Ouvre /stations
  APP->>RT: stations + index
  RT->>ST: findAll('station')
  ST->>API: GET APP.apiUrl/stations
  API->>CTL: list
  CTL->>INF: getStations()
  INF->>EXT: fetch(?limit=100)
  EXT-->>INF: JSON Open Data
  INF-->>CTL: document JSON:API avec data[]
  CTL-->>API: 200
  API-->>ST: réponse JSON:API
  ST-->>APP: modèles Station
  APP-->>U: page liste + filtres

  Note over U,EXT: Détail — URL /stations/:id

  U->>APP: Ouvre /stations/{id}
  APP->>RT: stations + show
  RT->>ST: findRecord('station', id)
  ST->>API: GET /stations/{id}
  API->>CTL: get (params.id)
  CTL->>INF: getStationById(id)
  INF->>INF: getStations() puis recherche par id
  INF-->>CTL: data station
  CTL-->>API: 200
  API-->>ST: JSON:API
  ST-->>APP: modèle Station
  APP-->>U: page détail
```

### Couches

```mermaid
flowchart TB
  subgraph client["Navigateur"]
    UI["UI templates + composants GJS"]
  end

  subgraph ember["bicloo-app"]
    RV["Router /stations et /stations/:id"]
    RTI["routes stations/index · stations/show"]
    MD["Modèle Station"]
    ST["Store Warp Drive (legacy)"]
    AD["JSONAPIAdapter · host = APP.apiUrl"]
    RV --> RTI --> ST --> AD
    ST --> MD
  end

  subgraph api_pkg["api (Node · Hapi)"]
    HK["Serveur · CORS"]
    HR["GET /stations · GET /stations/{id}"]
    CT["stationsController"]
    INF["bicloo-api · getStations · getStationById"]
    HK --> HR --> CT --> INF
  end

  subgraph ext["Extérieur"]
    OD[("API Open Data Bicloo\nvariable BICLOO_API_URL")]
  end

  UI <--> RV
  AD -->|"HTTP JSON:API"| HK
  INF -->|"HTTPS fetch"| OD
```

Les diagrammes s’affichent sur GitHub et dans de nombreux éditeurs Markdown ; en local, une extension « Mermaid » peut être nécessaire.
