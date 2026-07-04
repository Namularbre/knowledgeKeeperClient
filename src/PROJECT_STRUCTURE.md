mon-projet-tauri/
├── src/                          # FRONTEND (SolidJS)
│   ├── assets/                   # Images, icônes, polices globales
│   ├── components/               # Composants UI réutilisables et "bêtes"
│   │   ├── Button/
│   │   └── Sidebar/
│   ├── context/                  # Contextes SolidJS (ex: gestion du thème global)
│   ├── features/                 # Architecture orientée "Features" (Recommandé)
│   │   ├── dashboard/
│   │   │   ├── components/       # Composants exclusifs au Dashboard
│   │   │   ├── Dashboard.tsx     # Page / Vue principale
│   │   │   └── dashboardStore.ts # État SolidJS local à la feature
│   │   └── settings/
│   ├── services/                 # Pont entre SolidJS et le monde extérieur
│   │   ├── api/                  # Si vous avez des appels HTTP classiques
│   │   └── tauri/                # Abstraction des commandes Rust (IPC)
│   │       ├── client.ts         # Encapsulation des méthodes `invoke`
│   │       └── events.ts         # Gestion des écouteurs d'événements Tauri
│   ├── App.tsx                   # Composant racine, définition des routes
│   ├── index.scss                # Styles globaux (Tailwind, Vanilla CSS...)
│   └── index.tsx                 # Point d'entrée SolidJS (Mounting)
│
└── src-tauri/                    # BACKEND (Rust)
├── Cargo.toml
├── tauri.conf.json
└── src/
├── commands/             # Vos commandes Rust appelées par le front
│   ├── mod.rs            # Déclaration du module commands
│   ├── auth.rs           # Exemple : commandes liées à l'authentification
│   └── database.rs       # Exemple : requêtes SQL locales (SQL Server/SQLite)
├── models/               # Structs Rust partagées (Data Transfer Objects)
├── lib.rs                # Configuration des plugins v2 et enregistrement des commands
└── main.rs               # Point d'entrée natif minimal