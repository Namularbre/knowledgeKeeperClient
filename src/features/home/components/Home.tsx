import {Show} from "solid-js";
import {user} from "../../auth/session.ts";
import {A} from '@solidjs/router';
import {LoadingText} from "../../../components/LoadingText.tsx";

function Home() {
    return (
      <>
          <Show when={user()} fallback={<LoadingText></LoadingText>}>
              {(u) => <A href='/me'>{u().email}</A> }
          </Show>
          <h1>Knowledge Keeper</h1>
          <p>Bienvenue, gardien du savoir !</p>
      </>
    );
}

export {Home};
