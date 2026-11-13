import {createResource, Show} from "solid-js";
import {A} from "@solidjs/router";
import {getUser} from "../../../services/tauri/client.ts";
import {LoadingText} from "../../../components/LoadingText.tsx";

function Me() {
    const [me] = createResource(getUser);

    return (
        <div class="me">
            <h1>Votre compte</h1>

            <Show when={!me.error} fallback={<p>Impossible de charger le compte.</p>}>
                <Show when={me()} fallback={<LoadingText></LoadingText>}>
                    {(u) => (
                        <>
                            <p>Connecté en tant que <strong>{u().email}</strong></p>
                            <p>Votre identifiant est {u().id}</p>
                        </>
                    )}
                </Show>
            </Show>

            <A href="/">Retour</A>
        </div>
    );
}

export { Me }