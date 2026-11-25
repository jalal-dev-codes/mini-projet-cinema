import { searchMovies } from "./api.js";

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const loadMoreButton = document.getElementById("load-more");

let currentPage = 1;
let currentQuery = "";
let totalResults = 0;
let searchTimeout;

function displayMovies(movies) {
    movies.forEach(movie => {
        const card = document.createElement("article");
        card.classList.add("movie-card");

        const poster = movie.Poster !== "N/A"
            ? movie.Poster
            : "";

        card.innerHTML = `
            <img src="${poster}" alt="Affiche de ${movie.Title}">
            <h3>${movie.Title}</h3>
            <a href="movie.html?id=${movie.imdbID}">En savoir plus</a>
                En savoir plus
            </a>
        `;

        resultsContainer.appendChild(card);
    });
}

async function performSearch(query, page = 1) {
    try {
        const data = await searchMovies(query, page);

        if (data.Response === "False") {
            if (page === 1) {
                resultsContainer.textContent = "Aucun film trouvé.";
            }
            loadMoreButton.hidden = true;
            return;
        }

        if (page === 1) {
            resultsContainer.innerHTML = "";
        }

        displayMovies(data.Search);

        totalResults = Number(data.totalResults);

        loadMoreButton.hidden =
            currentPage * 10 >= totalResults;

    } catch (error) {
        console.error(error);
        resultsContainer.textContent =
            "Une erreur est survenue.";
    }
}

searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);

    const query = searchInput.value.trim();

    if (query.length < 2) {
        resultsContainer.innerHTML =
            "<p>Saisissez au moins 2 caractères.</p>";

        loadMoreButton.hidden = true;
        return;
    }

    searchTimeout = setTimeout(() => {
        currentQuery = query;
        currentPage = 1;
        performSearch(currentQuery, currentPage);
    }, 500);
});

loadMoreButton.addEventListener("click", () => {
    currentPage++;
    performSearch(currentQuery, currentPage);
});
