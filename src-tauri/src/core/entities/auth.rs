use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine as _};

pub struct TokenPair {
    pub access_token: String,
    pub expires_in: i64,
    pub refresh_token: String,
    pub refresh_expires_in: i64,
}

/// Extrait la claim "email" du payload d'un JWT.
///
/// On ne vérifie PAS la signature : le serveur l'a déjà validée en émettant
/// le token, et ici on ne lit qu'une info d'affichage. Un JWT = 3 parties
/// séparées par des points (`header.payload.signature`) ; le payload est du
/// JSON encodé en base64url. Renvoie None si le token est malformé ou sans email.
pub fn email_from_access_token(token: &str) -> Option<String> {
    let payload = token.split('.').nth(1)?;
    let decoded = URL_SAFE_NO_PAD.decode(payload).ok()?;
    let claims: serde_json::Value = serde_json::from_slice(&decoded).ok()?;
    claims.get("email")?.as_str().map(str::to_string)
}

#[derive(Debug, thiserror::Error)]
pub enum AuthError {
    #[error("email already exists")]
    EmailAlreadyExists,
    #[error("invalid email or password")]
    InvalidCredentials,
    #[error("invalid request")]
    InvalidRequest,
    #[error("session expired, please log in again")]
    InvalidRefreshToken,
    #[error("network error: {0}")]
    Network(String),
    #[error("secure storage error: {0}")]
    Storage(String),
    #[error("unexpected error: {0}")]
    Unexpected(String),
}
