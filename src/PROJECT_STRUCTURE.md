mon-projet-tauri/
├── src/                          # FRONTEND (SolidJS)
│   ├── assets/                   # Images, icônes, polices globales
│   ├── components/               # Composants UI réutilisables et "bêtes" (sans état global)
│   │   ├── FormField.tsx         # Form.Group + Form.Label + Form.Control (solid-bootstrap)
│   │   └── LoadingText.tsx
│   ├── layout/                   # Éléments de mise en page qui lisent l'état global
│   │   └── Header.tsx            # Barre de navigation (via useAuth)
│   ├── features/                 # Architecture orientée "Features"
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx  # Contexte d'authentification + hook useAuth()
│   │   │   └── components/       # Login, Register, Me, LogoutButton, RequireAuth (garde)
│   │   ├── home/components/
│   │   └── errors/components/    # NotFound
│   ├── primitives/               # Primitives réactives réutilisables (createSubmit…)
│   ├── services/                 # Pont entre SolidJS et le monde extérieur
│   │   └── tauri/                # Abstraction des commandes Rust (IPC)
│   │       ├── client.ts         # Encapsulation des méthodes `invoke`
│   │       └── events.ts         # Gestion des écouteurs d'événements Tauri
│   ├── types/                    # Types partagés (User…), sans dépendance vers les features
│   ├── styles/                   # SCSS : variables, import Bootstrap, surcharges
│   ├── theme.ts                  # Synchronise le thème Bootstrap avec celui de l'OS
│   ├── App.tsx                   # Layout racine : AuthProvider + Header + <main>
│   └── index.tsx                 # Point d'entrée : définition des routes et montage
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

## Règles de conception (frontend)

- Les composants Bootstrap (Button, Form, Alert, Navbar, Modal…) viennent de `solid-bootstrap`.
  On n'écrit un composant maison dans `components/` que pour assembler plusieurs d'entre eux.
- `components/` ne contient que des composants sans état global : ils reçoivent tout par props
  et transmettent le reste avec `splitProps` / `mergeProps`.
- Ne jamais déstructurer `props` ni lire `props.x` dans une constante : la réactivité se perd.
- L'état global passe par un Provider + un hook (`useAuth()`). Aucun setter n'est exporté :
  on modifie l'état via les actions du contexte (`login`, `register`…).
- Les pages privées sont enfants de la route `RequireAuth` dans `index.tsx`.
- `services/` ne dépend pas de `features/` ; les types communs vont dans `types/`.
