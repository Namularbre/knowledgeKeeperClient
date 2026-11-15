import {Match, Switch} from "solid-js";
import {Navigate, type RouteSectionProps} from "@solidjs/router";
import {useAuth} from "../AuthProvider.tsx";
import {LoadingText} from "../../../components/LoadingText.tsx";

/**
 * Parent route for every private page: redirects to /login when nobody is logged in.
 */
function RequireAuth(props: RouteSectionProps) {
    const auth = useAuth();

    return (
        <Switch>
            <Match when={auth.status() === "unknown"}>
                <LoadingText/>
            </Match>
            <Match when={auth.status() === "anonymous"}>
                <Navigate href="/login"/>
            </Match>
            <Match when={auth.status() === "authenticated"}>
                {props.children}
            </Match>
        </Switch>
    );
}

export {RequireAuth};
