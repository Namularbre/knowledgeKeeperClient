import {Input} from "../../../components/Input.tsx";
import {Button} from "../../../components/Button.tsx";
import "./Register.css";
import {createSignal} from "solid-js";
import {A, useNavigate} from "@solidjs/router";
import {register} from "../../../services/tauri/client.ts";

function Register() {
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
            await register(email, password);
            navigate("/login");
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
              <h1 class="h3 text-center mb-4">Créer un compte</h1>

              <form onsubmit={handleSubmit}>
                  <div class="mb-3">
                      <Input displayName={"Email"} name={"email"} id={"email"} required={true} classes={undefined} value={undefined} type={"text"} placeholder={"Ex: jean.dupont@gmail.com"}></Input>
                  </div>
                  <div class="mb-3">
                      <Input displayName={"Mot de passe"} name={"password"} id={"password"} required={true} classes={undefined} value={undefined} type={"password"} placeholder={"Ex: 145esdhfirkfr54454efsdfsdf"}></Input>
                  </div>
                  {error() && <div class="alert alert-danger" role="alert">{error()}</div>}
                  <div class="d-grid mb-3">
                      <Button text={pending() ? "Tentative de création du compte..." : "Créer mon compte"} color={"primary"} action={undefined} type={"submit"}></Button>
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
