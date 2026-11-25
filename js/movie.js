import { getMovieDetails } from "./api.js";

const movieContainer = document.getElementById("movie-details");

// Récupérer l'identifiant du film dans l'URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Formater la date en français
function formatDate(date) {
    if (!date || date === "N/A") {
        return "Non renseignée";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Non renseignée";
    }

    return parsedDate.toLocaleDateString("fr-FR");
}

// Charger les informations du film
async function loadMovie() {
    if (!movieId) {
        movieContainer.textContent = "Aucun film sélectionné.";
        return;
    }

    try {
        const movie = await getMovieDetails(movieId);
        console.log(movie);
        console.log("Note IMDb :", movie.imdbRating);
console.log("Date DVD :", movie.DVD);

        if (movie.Response === "False") {
            movieContainer.textContent = "Film introuvable.";
            return;
        }

        movieContainer.innerHTML = `
            <div class="movie-detail-card">

                <h2>${movie.Title}</h2>

                <img
                    src="${movie.Poster !== "N/A" ? movie.Poster : ""}"
                    alt="Affiche de ${movie.Title}"
                >

                <div class="movie-information">

                    <h3>Résumé</h3>
                    <p>${movie.Plot}</p>

                    <h3>Genre</h3>
                    <p>${movie.Genre}</p>

                    <h3>Acteurs</h3>
                    <p>${movie.Actors}</p>

                    <h3>Notes</h3>
                    <p>${movie.imdbRating}/10</p>

                    <h3>Date de sortie DVD</h3>
                    <p>${formatDate(movie.DVD)}</p>

                </div>
            </div>
        `;

    } catch (error) {
        console.error(error);
        movieContainer.textContent =
            "Impossible de charger les informations du film.";
    }
}

loadMovie();
