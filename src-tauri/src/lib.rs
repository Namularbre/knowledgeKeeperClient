mod core;
mod infrastructure;
mod interface;

use infrastructure::clients::auth_client::HttpAuthClient;
use infrastructure::token_store::StrongholdTokenStore;
use std::sync::Mutex;
use tauri::Manager;

pub struct AppState {
    pub http_client: HttpAuthClient,
    pub access_token: Mutex<Option<String>>,
    pub token_store: StrongholdTokenStore,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let data_dir = app.path().app_local_data_dir()?;
            let token_store = StrongholdTokenStore::open(
                data_dir.join("vault.stronghold"),
                data_dir.join("salt.txt"),
            )?;

            app.manage(AppState {
                http_client: HttpAuthClient::new(reqwest::Client::new()),
                access_token: Mutex::new(None),
                token_store,
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            interface::commands::auth_commands::login,
            interface::commands::auth_commands::try_restore_session,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
