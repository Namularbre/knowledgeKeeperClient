import {createSignal, onCleanup, Show} from "solid-js";
import {useNavigate} from "@solidjs/router";
import {Button, Modal} from "solid-bootstrap";
import {useAuth} from "../AuthProvider.tsx";
import {LogoutIcon} from "../../../components/icons/LogoutIcon.tsx";

/** How long the "confirm" state lasts before going back to normal. */
const CONFIRM_DELAY_MS = 4000;

/**
 * Logout button with a two-step confirmation: the first click asks for
 * confirmation, the second one logs out. If the API cannot revoke the
 * session, a modal explains it and lets the user retry or force the logout.
 */
function LogoutButton() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [confirming, setConfirming] = createSignal(false);
    const [pending, setPending] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);

    let timer: ReturnType<typeof setTimeout> | undefined;
    onCleanup(() => clearTimeout(timer));

    const logout = async (force: boolean) => {
        setPending(true);
        try {
            await auth.logout(force);
            setError(null);
            navigate("/login", {replace: true});
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setPending(false);
        }
    };

    const onClick = () => {
        clearTimeout(timer);
        if (!confirming()) {
            setConfirming(true);
            timer = setTimeout(() => setConfirming(false), CONFIRM_DELAY_MS);
            return;
        }
        setConfirming(false);
        void logout(false);
    };

    const label = () => (confirming() ? "Confirmer la déconnexion" : "Se déconnecter");

    return (
        <>
            <Button
                size="sm"
                variant={confirming() ? "danger" : "outline-danger"}
                class="d-inline-flex align-items-center gap-2"
                disabled={pending()}
                onClick={onClick}
                title={label()}
                aria-label={label()}
            >
                <Show when={!pending()} fallback={<span class="spinner-border spinner-border-sm" aria-hidden="true"/>}>
                    <LogoutIcon/>
                </Show>
                {/* Text only in the confirm state, so the user knows a second click is needed */}
                <Show when={confirming()}>
                    <span>Confirmer ?</span>
                </Show>
            </Button>

            <Modal show={error() !== null} onHide={() => setError(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Déconnexion impossible</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Le serveur n'a pas pu révoquer votre session. Vous êtes toujours connecté sur cet appareil.
                    </p>
                    <p>
                        Si vous forcez la déconnexion, la session sera effacée de cet appareil, mais votre jeton
                        restera valide côté serveur jusqu'à son expiration.
                    </p>
                    <p class="small text-body-secondary mb-0">Détail : {error()}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={pending()} onClick={() => setError(null)}>Annuler</Button>
                    <Button variant="outline-danger" disabled={pending()} onClick={() => void logout(true)}>
                        Forcer la déconnexion
                    </Button>
                    <Button variant="primary" disabled={pending()} onClick={() => void logout(false)}>Réessayer</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export {LogoutButton};
