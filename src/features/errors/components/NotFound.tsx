import {A} from "@solidjs/router";

function NotFound() {
    return (
      <div class="text-center py-5">
          <h1 class="display-4 fw-bold">404</h1>
          <p class="alert alert-warning d-inline-block">La page que vous essayer d'afficher n'existe pas</p>
          <div>
              <A href="/" class="btn btn-primary">Retourner à la page d'accueil</A>
          </div>
      </div>
    );
}

export {NotFound};
