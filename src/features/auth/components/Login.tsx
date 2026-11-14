import {createSignal} from "solid-js";
import {A, useNavigate} from "@solidjs/router";
import {Input} from "../../../components/Input.tsx";
import {Button} from "../../../components/Button.tsx";
import {login} from "../../../services/tauri/client";
import "./Login.css";
import {loadCurrentUser} from "../session.ts";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = createSignal<string | null>(null);
    const [pending, setPending] = createSignal(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        setPending(true);
        setError(null);
        try {
            await login(email, password);
            await loadCurrentUser();
            navigate("/");
        } catch (err) {
            setError(String(err));
        } finally {
            setPending(false);
        }
    };

    return (
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
          <div class="card shadow-sm">
            <div class="card-body p-4">
              <h1 class="h3 text-center mb-4">Connexion</h1>

              <form onsubmit={handleSubmit}>
                  <div class="mb-3">
                      <Input displayName={"Email"} name={"email"} id={"email"} required={true} classes={undefined} value={undefined} type={"text"} placeholder={"Ex: jean.dupont@example.com"}></Input>
                  </div>
                  <div class="mb-3">
                      <Input displayName={"Mot de passe"} name={"password"} id={"password"} required={true} classes={undefined} value={undefined} type={"password"} placeholder={undefined}></Input>
                  </div>
                  {error() && <div class="alert alert-danger" role="alert">{error()}</div>}
                  <div class="d-grid">
                      <Button text={pending() ? "Connexion..." : "Se connecter"} color={"primary"} action={undefined} type={"submit"}></Button>
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
