const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//* Upload All Events

eventListeners();

function eventListeners() {
	form.addEventListener("submit", addMovie);

	document.addEventListener("DOMContentLoaded", function () {
		let movies = Storage.getMoviesFromStorage();
		UI.loadAllMovies(movies);
	});

	cardBody.addEventListener("click", deleteMovie);
	clear.addEventListener("click", clearAllMovies);
}

function addMovie(e) {
	const title = titleElement.value;
	const director = directorElement.value;
	const url = urlElement.value;

	if (title === "" || director === "" || url === "") {
		//! Error Message
		UI.displayMessages("Tüm alanları doldurun...", "danger");
	} else {
		//* New Movie
		const newMovie = new Movie(title, director, url);

		//* Add Movie To UI
		UI.addMovieToUI(newMovie);
		//* Add Movie To Storage
		Storage.addMovieToStorage(newMovie);

		UI.displayMessages("Film başarıyla eklendi...", "success");
	}

	UI.clearInputs(titleElement, urlElement, directorElement);
	e.preventDefault();
}

function deleteMovie(e) {
	if (e.target.id === "delete-film") {
		UI.deleteMovieFromUI(e.target);
		Storage.deleteMovieFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

		UI.displayMessages("Silme işlemi başarılı...", "success");
	}
}

function clearAllMovies() {
	if (confirm("Emin misiniz?")) {
		UI.clearAllMoviesFromUI();
		Storage.clearAllMoviesFromStorage();
	}
}
