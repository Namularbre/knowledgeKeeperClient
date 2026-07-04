use std::path::PathBuf;

use crate::core::entities::auth::AuthError;

/// Fixed, app-embedded vault password (not user-entered). This is
/// obfuscation-at-rest against casual file inspection, not a secret against
/// an attacker with access to the binary/source — a real master-password UX
/// is a future improvement, not part of this feature.
const APP_VAULT_PASSWORD: &str = "knowledgekeeper-client-local-vault-v1";
const CLIENT_PATH: &[u8] = b"knowledgekeeper-auth";
const REFRESH_TOKEN_KEY: &[u8] = b"refresh_token";

pub struct StrongholdTokenStore {
    stronghold: tauri_plugin_stronghold::stronghold::Stronghold,
}

impl StrongholdTokenStore {
    pub fn open(vault_path: PathBuf, salt_path: PathBuf) -> Result<Self, AuthError> {
        let key = tauri_plugin_stronghold::kdf::KeyDerivation::argon2(APP_VAULT_PASSWORD, &salt_path);
        let stronghold = tauri_plugin_stronghold::stronghold::Stronghold::new(vault_path, key)
            .map_err(|e| AuthError::Storage(e.to_string()))?;
        Ok(Self { stronghold })
    }

    fn client(&self) -> Result<iota_stronghold::Client, AuthError> {
        self.stronghold
            .load_client(CLIENT_PATH)
            .or_else(|_| self.stronghold.create_client(CLIENT_PATH))
            .map_err(|e| AuthError::Storage(e.to_string()))
    }

    pub fn save_refresh_token(&self, token: &str) -> Result<(), AuthError> {
        let client = self.client()?;
        client
            .store()
            .insert(REFRESH_TOKEN_KEY.to_vec(), token.as_bytes().to_vec(), None)
            .map_err(|e| AuthError::Storage(e.to_string()))?;
        self.stronghold.save().map_err(|e| AuthError::Storage(e.to_string()))
    }

    pub fn read_refresh_token(&self) -> Result<Option<String>, AuthError> {
        let client = self.client()?;
        let bytes = client
            .store()
            .get(REFRESH_TOKEN_KEY)
            .map_err(|e| AuthError::Storage(e.to_string()))?;
        Ok(bytes.map(|b| String::from_utf8_lossy(&b).to_string()))
    }
}
