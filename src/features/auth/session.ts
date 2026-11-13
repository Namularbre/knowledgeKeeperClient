import {createSignal} from "solid-js";
import {User} from "./types.ts";
import {getUser} from "../../services/tauri/client.ts";

/**
 * État d'authentification partagé entre les pages.
 * Un signal défini au niveau du module = une seule instance pour toute l'app,
 * lisible et modifiable depuis n'importe quel composant (App, Login…).
 * null = personne de connecté.
 */
export const [user, setUser] = createSignal<User | null>(null);

export async function loadCurrentUser() {
    setUser(await getUser());
}
