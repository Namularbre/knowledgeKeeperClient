pub struct TokenPair {
    pub access_token: String,
    pub expires_in: i64,
    pub refresh_token: String,
    pub refresh_expires_in: i64,
}

#[derive(Debug, thiserror::Error)]
pub enum AuthError {
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
