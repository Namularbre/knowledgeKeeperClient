import { invoke } from "@tauri-apps/api/core";
import type {User} from "../../types/user.ts";

export async function login(email: string, password: string): Promise<void> {
    await invoke("login", { email, password });
}

export async function tryRestoreSession(): Promise<boolean> {
    const res = await invoke<{ authenticated: boolean }>("try_restore_session");
    return res.authenticated;
}

export async function register(email: string, password: string): Promise<void> {
    await invoke("register", {email, password});
}

export async function getUser(): Promise<User> {
    return await invoke("get_user");
}

/**
 * Revokes the session on the API, then clears it locally.
 * With `force`, the local session is cleared even if the API call fails.
 */
export async function logout(force = false): Promise<void> {
    await invoke("logout", {force});
}
