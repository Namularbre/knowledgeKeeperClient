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
      <>
        <h1>Register</h1>

        <form onsubmit={handleSubmit}>
            <div>
                <Input displayName={"Email"} name={"email"} id={"email"} required={true} classes={undefined} value={undefined} type={"text"} placeholder={"Ex: jean.dupont@gmail.com"}></Input>
            </div>
            <div>
                <Input displayName={"mot de passe"} name={"password"} id={"password"} required={true} classes={undefined} value={undefined} type={"password"} placeholder={"Ex: 145esdhfirkfr54454efsdfsdf"}></Input>
            </div>
            {error() && <p class="alert alert-danger">{error()}</p>}
            <Button text={pending() ? "Tentative de création du compte..." : "Créer mon compte"} color={"primary"} action={undefined} type={"submit"}></Button>
        </form>

        <p class="alert alert-info">Une fois votre compte créer, vous devrez vous connecter.</p>

        <p>
            Déjà un compte ?{" "}
            <A href="/login">Se connecter</A>
        </p>
      </>
    );
}

export {Register}
