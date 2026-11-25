import { searchMovies, getMovieDetails } from "./api.js";

const moviesContainer = document.getElementById("movies-container");
const loadMoreButton = document.getElementById("load-more");

// Films choisis pour la page d'accueil
const trendingMovies = [
    "Interstellar",
    "Inception",
    "The Dark Knight",
    "Avatar",
    "Titanic",
    "Gladiator",
    "The Matrix",
    "Joker",
    "Avengers Endgame",
    "The Batman",
    "Iron Man",
    "Spider-Man"
];
let currentMovie = 0;

// Afficher un film
async function displayMovie(title) {
    const data = await searchMovies(title);

    if (data.Response === "False") {
        return;
    }

    const movie = data.Search[0];

    const details = await getMovieDetails(movie.imdbID);

    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
        <img src="${details.Poster !== "N/A" ? details.Poster : ""}"
             alt="Affiche de ${details.Title}">

        <h3>${details.Title}</h3>

        <p>${details.Plot}</p>

        <a href="movie.html?id=${details.imdbID}">En savoir plus>/a>
            En savoir plus
        </a>
    `;

    moviesContainer.appendChild(movieCard);
}

// Charger les films
async function loadMovies() {
    loadMoreButton.disabled = true;

    const nextMovies = trendingMovies.slice(
        currentMovie,
        currentMovie + 3
    );

    for (const title of nextMovies) {
        try {
            await displayMovie(title);
        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    currentMovie += nextMovies.length;

    loadMoreButton.disabled = currentMovie >= trendingMovies.length;
}

loadMoreButton.addEventListener("click", loadMovies);

// Chargement initial
loadMovies();

