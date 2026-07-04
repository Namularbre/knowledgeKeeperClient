import {Input} from "../../../components/Input.tsx";
import {Button} from "../../../components/Button.tsx";
import "./styles.css";

function Register() {
    return (
      <>
        <h1>Register</h1>

        <form>
            <div>
                <Input displayName={"nom d'utilisateur"} name={"username"} id={"username"} required={true} classes={undefined} value={undefined} type={"text"} placeholder={"Ex: Jean Dupont"}></Input>
            </div>
            <div>
                <Input displayName={"mot de passe"} name={"password"} id={"password"} required={true} classes={undefined} value={undefined} type={"password"} placeholder={"Ex: 145esdhfirkfr54454efsdfsdf"}></Input>
            </div>
            <Button text={"Créer mon compte"} color={"primary"} action={undefined} type={"submit"}></Button>
        </form>
      </>
    );
}

export {Register}
