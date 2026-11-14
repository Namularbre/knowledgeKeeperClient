import {Show} from "solid-js";
import {A} from "@solidjs/router";
import {useAuth} from "../features/auth/AuthProvider.tsx";

/** Top navigation bar, shown only when someone is logged in. */
function Header() {
    const auth = useAuth();

    return (
        <Show when={auth.user()}>
            {(u) => (
                <nav class="navbar bg-body-tertiary border-bottom mb-4">
                    <div class="container">
                        <A href="/" class="navbar-brand fw-semibold">Knowledge Keeper</A>
                        <A href="/me" class="navbar-text">Bonjour {u().email} !</A>
                    </div>
                </nav>
            )}
        </Show>
    );
}

export {Header};
