import {Show} from "solid-js";
import {user} from "../../auth/session.ts";
import {A} from '@solidjs/router';
import {LoadingText} from "../../../components/LoadingText.tsx";

function Home() {
    return (
      <div class="py-5 text-center">
          <h1 class="display-5 fw-bold">Knowledge Keeper</h1>
          <p class="lead text-body-secondary mb-4">Bienvenue, gardien du savoir !</p>
          <Show when={user()} fallback={<LoadingText></LoadingText>}>
              {(u) => <A href='/me' class="btn btn-outline-primary">Mon compte ({u().email})</A> }
          </Show>
      </div>
    );
}

export {Home};
