import {createSignal, onMount, Show} from "solid-js";
import {Login} from "./features/auth/components/Login.tsx";
import {tryRestoreSession} from "./services/tauri/client";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = createSignal(false);

  onMount(async () => {
    setAuthenticated(await tryRestoreSession());
  });

  return (
    <main class="container">
        <Show when={authenticated()} fallback={<Login onSuccess={() => setAuthenticated(true)} />}>
            <h1>Knowledge Keeper</h1>
            <p>Bienvenue, gardien du savoir !</p>
        </Show>
    </main>
  );
}

export default App;
