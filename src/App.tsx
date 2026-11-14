import {createSignal, onMount, Show} from "solid-js";
import {A, useLocation, useNavigate, type RouteSectionProps} from "@solidjs/router";
import {tryRestoreSession} from "./services/tauri/client";
import {user, loadCurrentUser} from "./features/auth/session";
import {LoadingText} from "./components/LoadingText.tsx";
import "./App.css";

/**
 * Layout racine : enveloppe toutes les routes.
 * `props.children` = la page correspondant à l'URL courante.
 */
function App(props: RouteSectionProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = createSignal(false);

  onMount(async () => {
    const authenticated = await tryRestoreSession();
    // Garde simple : si on arrive sur l'accueil sans session, on renvoie vers login.
    if (!authenticated && location.pathname === "/") {
      navigate("/login", {replace: true});
    }

    if (authenticated) {
      try {
        await loadCurrentUser();
      } catch (e) {
        // Pas d'email disponible (ex : JWT sans claim email) — on ignore.
        console.error("loadCurrentUser failed", e);
      }
    }
    setReady(true);
  });

  return (
    <>
      <Show when={user()}>
        <nav class="navbar bg-body-tertiary border-bottom mb-4">
          <div class="container">
            <A href="/" class="navbar-brand fw-semibold">Knowledge Keeper</A>
            <span class="navbar-text">Bonjour {user()?.email} !</span>
          </div>
        </nav>
      </Show>
      <main class="container py-4">
        <Show when={ready()} fallback={<LoadingText></LoadingText>}>
          {props.children}
        </Show>
      </main>
    </>
  );
}

export {App};
