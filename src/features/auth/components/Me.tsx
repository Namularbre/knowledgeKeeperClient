import {createResource, Show} from "solid-js";
import {A} from "@solidjs/router";
import {getUser} from "../../../services/tauri/client.ts";
import {LoadingText} from "../../../components/LoadingText.tsx";

function Me() {
    const [me] = createResource(getUser);

    return (
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <h1 class="h3 mb-4">Votre compte</h1>

                        <Show when={!me.error} fallback={<div class="alert alert-danger">Impossible de charger le compte.</div>}>
                            <Show when={me()} fallback={<LoadingText></LoadingText>}>
                                {(u) => (
                                    <ul class="list-group mb-4">
                                        <li class="list-group-item">Connecté en tant que <strong>{u().email}</strong></li>
                                        <li class="list-group-item">Votre identifiant est <code>{u().id}</code></li>
                                    </ul>
                                )}
                            </Show>
                        </Show>

                        <A href="/" class="btn btn-outline-secondary">Retour</A>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Me }
