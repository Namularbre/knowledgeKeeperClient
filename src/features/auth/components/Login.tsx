import {Show} from "solid-js";
import {A, useNavigate} from "@solidjs/router";
import {Input} from "../../../components/Input.tsx";
import {Button} from "../../../components/Button.tsx";
import {createSubmit} from "../../../primitives/createSubmit.ts";
import {useAuth} from "../AuthProvider.tsx";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const auth = useAuth();

    const {pending, error, onSubmit} = createSubmit(async (data) => {
        await auth.login(String(data.get("email")), String(data.get("password")));
        navigate("/");
    });

    return (
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <div class="card shadow-sm">
            <div class="card-body p-4">
              <h1 class="h3 text-center mb-4">Connexion</h1>

              <form onSubmit={onSubmit}>
                  <div class="mb-3">
                      <Input label="Email" name="email" id="email" type="email" autocomplete="email" required placeholder="Ex: jean.dupont@example.com"/>
                  </div>
                  <div class="mb-3">
                      <Input label="Mot de passe" name="password" id="password" type="password" autocomplete="current-password" required/>
                  </div>
                  <Show when={error()}>
                      <div class="alert alert-danger" role="alert">{error()}</div>
                  </Show>
                  <div class="d-grid">
                      <Button type="submit" disabled={pending()}>
                          {pending() ? "Connexion..." : "Se connecter"}
                      </Button>
                  </div>
              </form>
            </div>
            <div class="card-footer text-center small">
              Pas encore de compte ?{" "}
              <A href="/register">Créer un compte</A>
            </div>
          </div>
        </div>
      </div>
    );
}

export {Login}
