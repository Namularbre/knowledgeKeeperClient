src-tauri/src/
├── core/                         # 1. LE CŒUR MÉTIER (Indépendant de Tauri)
│   ├── entities/                 # Structures de données pures (ex: Compte, Utilisateur)
│   │   └── mod.rs
│   ├── services/                 # Logique métier, règles de gestion, cas d'utilisation
│   │   ├── mod.rs
│   │   └── transaction_service.rs
│   └── repositories/             # Interfaces (Traits) d'accès aux données
│       └── mod.rs
│
├── infrastructure/               # 2. LES ADAPTATEURS EXTERNES
│   ├── database/                 # Implémentation des Repositories (ex: Diesel/SQLx + SQLite)
│   │   ├── mod.rs
│   │   └── sql_repository.rs
│   └── clients/                  # API tierces, protocoles réseau
│
├── interface/                    # 3. LA COUCHE D'ENTRÉE (Le pont avec le Front)
│   ├── commands/                 # Les commandes #[tauri::command] (Contrôleurs)
│   │   ├── mod.rs
│   │   └── transaction_commands.rs
│   └── dtos/                     # Data Transfer Objects pour la sérialisation Serde
│
├── lib.rs                        # Point d'ancrage, injection de dépendances et setup Tauri
└── main.rs                       # Point d'entrée binaire minimal