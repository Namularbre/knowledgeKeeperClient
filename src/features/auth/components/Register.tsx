import {Show} from "solid-js";
import {A, useNavigate} from "@solidjs/router";
import {Input} from "../../../components/Input.tsx";
import {Button} from "../../../components/Button.tsx";
import {createSubmit} from "../../../primitives/createSubmit.ts";
import {useAuth} from "../AuthProvider.tsx";
import "./Register.css";

function Register() {
    const navigate = useNavigate();
    const auth = useAuth();

    const {pending, error, onSubmit} = createSubmit(async (data) => {
        await auth.register(String(data.get("email")), String(data.get("password")));
        navigate("/login");
    });

    return (
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <div class="card shadow-sm">
            <div class="card-body p-4">
              <h1 class="h3 text-center mb-4">Créer un compte</h1>

              <form onSubmit={onSubmit}>
                  <div class="mb-3">
                      <Input label="Email" name="email" id="email" type="email" autocomplete="email" required placeholder="Ex: jean.dupont@gmail.com"/>
                  </div>
                  <div class="mb-3">
                      <Input label="Mot de passe" name="password" id="password" type="password" autocomplete="new-password" required placeholder="Ex: 145esdhfirkfr54454efsdfsdf"/>
                  </div>
                  <Show when={error()}>
                      <div class="alert alert-danger" role="alert">{error()}</div>
                  </Show>
                  <div class="d-grid mb-3">
                      <Button type="submit" disabled={pending()}>
                          {pending() ? "Tentative de création du compte..." : "Créer mon compte"}
                      </Button>
                  </div>
              </form>

              <div class="alert alert-info small mb-0">Une fois votre compte créé, vous devrez vous connecter.</div>
            </div>
            <div class="card-footer text-center small">
              Déjà un compte ?{" "}
              <A href="/login">Se connecter</A>
            </div>
          </div>
        </div>
      </div>
    );
}

export {Register}
