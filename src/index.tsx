/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { App } from "./App.jsx";
import { Home } from "./features/home/components/Home.tsx";
import { Login } from "./features/auth/components/Login.tsx";
import { Register } from "./features/auth/components/Register.tsx";
import {NotFound} from "./features/errors/components/NotFound.tsx";
import {Me} from "./features/auth/components/Me.tsx";
//import {lazy} from "solid-js";

//TODO: faire le chargement lazy des composants pour les charger à l'affichage (voir si c'est une bonne idée avec Tauri)
//const Login = lazy(() => import("./features/auth/components/Login"))

render(() => (
    <Router root={App}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="*paramName" component={NotFound}/>
        <Route path="/me" component={Me}/>
    </Router>
    ),
    document.getElementById("root") as HTMLElement
);
