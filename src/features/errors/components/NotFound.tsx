import {A} from "@solidjs/router";

function NotFound() {
    return (
      <>
          <p class="alert alert-warning">La page que vous essayer d'afficher n'existe pas</p>
          <A href="/" class="btn btn-link">Retourner à la page d'accueil</A>
      </>
    );
}

export {NotFound};
