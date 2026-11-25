const API_KEY = "ef869e5";

const API_URL = "https://www.omdbapi.com/";

export async function searchMovies(title, page = 1) {
    const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Erreur lors de la connexion à OMDb");
    }

    const data = await response.json();

    return data;
}

export async function getMovieDetails(imdbID) {
    const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    if (!response.ok) {
        throw new Error("Impossible de récupérer le film");
    }

    const data = await response.json();

    return data;
}
