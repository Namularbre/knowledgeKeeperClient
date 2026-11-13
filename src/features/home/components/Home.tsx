import {Show} from "solid-js";
import {user} from "../../auth/session.ts";

function Home() {

    return (
      <>
          <Show when={user()} fallback={<p>chargement...</p>}>
              {(u) => <p>{u().email}</p>}
          </Show>
          <h1>Knowledge Keeper</h1>
          <p>Bienvenue, gardien du savoir !</p>
      </>
    );
}

export {Home};
