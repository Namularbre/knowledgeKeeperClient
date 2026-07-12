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
      <>
        <h1>Connexion</h1>

        <form onsubmit={handleSubmit}>
            <div>
                <Input displayName={"email"} name={"email"} id={"email"} required={true} classes={undefined} value={undefined} type={"text"} placeholder={"Ex: jean.dupont@example.com"}></Input>
            </div>
            <div>
                <Input displayName={"mot de passe"} name={"password"} id={"password"} required={true} classes={undefined} value={undefined} type={"password"} placeholder={undefined}></Input>
            </div>
            {error() && <p class="login-error">{error()}</p>}
            <Button text={pending() ? "Connexion..." : "Se connecter"} color={"primary"} action={undefined} type={"submit"}></Button>
        </form>

        <p>
            Pas encore de compte ?{" "}
            <A href="/register">Créer un compte</A>
        </p>
      </>
    );
}

export {Login}
