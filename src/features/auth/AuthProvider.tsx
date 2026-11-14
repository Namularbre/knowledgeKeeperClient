import {createContext, createResource, useContext, type Accessor, type ParentProps} from "solid-js";
import type {User} from "../../types/user.ts";
import * as client from "../../services/tauri/client.ts";

/** unknown = session not restored yet */
export type AuthStatus = "unknown" | "authenticated" | "anonymous";

interface AuthContextValue {
    user: Accessor<User | null>;
    status: Accessor<AuthStatus>;
    login(email: string, password: string): Promise<void>;
    register(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextValue>();

/** Restores the session saved by the Rust side, then loads the user. */
async function restoreSession(): Promise<User | null> {
    if (!(await client.tryRestoreSession())) return null;
    try {
        return await client.getUser();
    } catch (e) {
        console.error("getUser failed after restoring the session", e);
        return null;
    }
}

/**
 * Authentication state shared by the whole app.
 * Read it with `useAuth()`; only this provider can change it.
 */
function AuthProvider(props: ParentProps) {
    const [session, {mutate}] = createResource(restoreSession);

    // `latest` keeps the previous value and never triggers Suspense.
    const user = () => session.latest ?? null;
    const status = (): AuthStatus => {
        if (session.state === "unresolved" || session.state === "pending") return "unknown";
        return user() ? "authenticated" : "anonymous";
    };

    const value: AuthContextValue = {
        user,
        status,
        async login(email, password) {
            await client.login(email, password);
            mutate(await client.getUser());
        },
        async register(email, password) {
            await client.register(email, password);
        },
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}

export {AuthProvider, useAuth};
