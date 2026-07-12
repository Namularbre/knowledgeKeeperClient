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
    pub user_email: Mutex<Option<String>>,
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
                user_email: None.into(),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            interface::commands::auth_commands::login,
            interface::commands::auth_commands::try_restore_session,
            interface::commands::auth_commands::register,
            interface::commands::auth_commands::get_user,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
