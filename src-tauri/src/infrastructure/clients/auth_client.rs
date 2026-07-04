use crate::core::entities::auth::{AuthError, TokenPair};

pub const API_BASE_URL: &str = "http://localhost:8080";

pub struct HttpAuthClient {
    http: reqwest::Client,
    base_url: String,
}

#[derive(serde::Deserialize)]
struct TokenResponseDto {
    access_token: String,
    refresh_token: String,
    expires_in: i64,
    refresh_expires_in: i64,
}

impl HttpAuthClient {
    pub fn new(http: reqwest::Client) -> Self {
        Self {
            http,
            base_url: API_BASE_URL.to_string(),
        }
    }

    pub async fn login(&self, email: &str, password: &str) -> Result<TokenPair, AuthError> {
        self.exchange_credentials("/auth/login", &serde_json::json!({ "email": email, "password": password }))
            .await
    }

    pub async fn refresh(&self, refresh_token: &str) -> Result<TokenPair, AuthError> {
        self.exchange_credentials("/auth/refresh", &serde_json::json!({ "refresh_token": refresh_token }))
            .await
    }

    async fn exchange_credentials(&self, path: &str, body: &serde_json::Value) -> Result<TokenPair, AuthError> {
        let resp = self
            .http
            .post(format!("{}{}", self.base_url, path))
            .json(body)
            .send()
            .await
            .map_err(|e| AuthError::Network(e.to_string()))?;

        match resp.status() {
            reqwest::StatusCode::OK => {
                let dto: TokenResponseDto = resp
                    .json()
                    .await
                    .map_err(|e| AuthError::Unexpected(e.to_string()))?;
                Ok(TokenPair {
                    access_token: dto.access_token,
                    expires_in: dto.expires_in,
                    refresh_token: dto.refresh_token,
                    refresh_expires_in: dto.refresh_expires_in,
                })
            }
            reqwest::StatusCode::UNAUTHORIZED => {
                if path == "/auth/refresh" {
                    Err(AuthError::InvalidRefreshToken)
                } else {
                    Err(AuthError::InvalidCredentials)
                }
            }
            reqwest::StatusCode::BAD_REQUEST => Err(AuthError::InvalidRequest),
            status => Err(AuthError::Unexpected(format!("unexpected status {status}"))),
        }
    }
}
