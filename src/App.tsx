import type {RouteSectionProps} from "@solidjs/router";
import {AuthProvider} from "./features/auth/AuthProvider.tsx";
import {Header} from "./layout/Header.tsx";
import "./App.css";

/**
 * Layout racine : enveloppe toutes les routes.
 * `props.children` = la page correspondant à l'URL courante.
 */
function App(props: RouteSectionProps) {
    return (
        <AuthProvider>
            <Header/>
            <main class="container py-4">
                {props.children}
            </main>
        </AuthProvider>
    );
}

export {App};
