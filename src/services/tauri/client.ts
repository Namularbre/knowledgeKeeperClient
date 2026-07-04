import { invoke } from "@tauri-apps/api/core";

export async function login(email: string, password: string): Promise<void> {
    await invoke("login", { email, password });
}

export async function tryRestoreSession(): Promise<boolean> {
    const res = await invoke<{ authenticated: boolean }>("try_restore_session");
    return res.authenticated;
}
