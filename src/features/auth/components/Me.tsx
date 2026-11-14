import {Show} from "solid-js";
import {A} from "@solidjs/router";
import {useAuth} from "../AuthProvider.tsx";
import {LoadingText} from "../../../components/LoadingText.tsx";

function Me() {
    const auth = useAuth();

    return (
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <h1 class="h3 mb-4">Votre compte</h1>

                        <Show when={auth.user()} fallback={<LoadingText/>}>
                            {(u) => (
                                <ul class="list-group mb-4">
                                    <li class="list-group-item">Connecté en tant que <strong>{u().email}</strong></li>
                                    <li class="list-group-item">Votre identifiant est <code>{u().id}</code></li>
                                </ul>
                            )}
                        </Show>

                        <A href="/" class="btn btn-outline-secondary">Retour</A>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Me }
