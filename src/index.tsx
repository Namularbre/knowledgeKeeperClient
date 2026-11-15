/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { App } from "./App.tsx";
import { Home } from "./features/home/components/Home.tsx";
import { Login } from "./features/auth/components/Login.tsx";
import { Register } from "./features/auth/components/Register.tsx";
import { RequireAuth } from "./features/auth/components/RequireAuth.tsx";
import { NotFound } from "./features/errors/components/NotFound.tsx";
import { Me } from "./features/auth/components/Me.tsx";
import { syncThemeWithOS } from "./theme.ts";

// import style
import "./styles/main.scss";
//import {lazy} from "solid-js";

//TODO: faire le chargement lazy des composants pour les charger à l'affichage (voir si c'est une bonne idée avec Tauri)
//const Login = lazy(() => import("./features/auth/components/Login"))

syncThemeWithOS();

render(() => (
    <Router root={App}>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        {/* Pages privées : RequireAuth renvoie vers /login sans session */}
        <Route component={RequireAuth}>
            <Route path="/" component={Home}/>
            <Route path="/me" component={Me}/>
        </Route>
        <Route path="*404" component={NotFound}/>
    </Router>
    ),
    document.getElementById("root") as HTMLElement
);
