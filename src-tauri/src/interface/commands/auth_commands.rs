use crate::interface::dtos::auth_dto::{LoginResponseDto, RegisterResponseDto};
use crate::AppState;

#[tauri::command]
pub async fn login(
    state: tauri::State<'_, AppState>,
    email: String,
    password: String,
) -> Result<LoginResponseDto, String> {
    let pair = state
        .http_client
        .login(&email, &password)
        .await
        .map_err(|e| e.to_string())?;

    state
        .token_store
        .save_refresh_token(&pair.refresh_token)
        .map_err(|e| e.to_string())?;

    *state.access_token.lock().unwrap() = Some(pair.access_token);
    *state.user_email.lock().unwrap() = Some(email);

    Ok(LoginResponseDto { authenticated: true })
}

#[tauri::command]
pub async fn try_restore_session(state: tauri::State<'_, AppState>) -> Result<LoginResponseDto, String> {
    let Some(refresh_token) = state.token_store.read_refresh_token().map_err(|e| e.to_string())? else {
        return Ok(LoginResponseDto { authenticated: false });
    };

    match state.http_client.refresh(&refresh_token).await {
        Ok(pair) => {
            state
                .token_store
                .save_refresh_token(&pair.refresh_token)
                .map_err(|e| e.to_string())?;
            *state.access_token.lock().unwrap() = Some(pair.access_token);
            Ok(LoginResponseDto { authenticated: true })
        }
        Err(_) => Ok(LoginResponseDto { authenticated: false }),
    }
}

#[tauri::command]
pub async fn register(state: tauri::State<'_, AppState>, email: String, password: String) -> Result<RegisterResponseDto, String> {
    let user = state
        .http_client
        .register(&email, &password)
        .await
        .map_err(|e| e.to_string())?;
    //TODO: retourner un bool comme quoi ça à bien marché
    Ok(RegisterResponseDto {id: user.id, email: user.email})
}
