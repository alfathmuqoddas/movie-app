$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("https://www.omdbapi.com/?s=" + searchText + "&apikey=af1284eb&")
    .then((res) => {
      let movies = res.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3 col-6 mb-4">
            <div class="card" style="width:100%;">
              <img src="${movie.Poster}" class="card-img-top" alt="..." style="height:320px;">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}</p>
                <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary">More Info</a>
              </div>
            </div>
          </div>
        `;
      });
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("https://www.omdbapi.com/?i=" + movieId + "&apikey=af1284eb&")
    .then((res) => {
      let movie = res.data;
      console.log(res);
      let output = `
      <div class="row mb-5">
		<div class="col-12 col-md-4 text-center">
			<img src="${movie.Poster}" alt="movie-poster" class="img-fluid" />
		</div>
		<div class="col-12 col-md-8">
			<h2 class="my-4">${movie.Title} <small>(${movie.Year})</small></h2>
			<p>${movie.Plot}</p>
			<ul class="list-group">
				<li class="list-group-item">${movie.Genre}</li>
				<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
				<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
				<li class="list-group-item"><strong>Starring:</strong> ${movie.Actors}</li>
				<li class="list-group-item"><strong>Release:</strong> ${movie.Released}</li>
				<li class="list-group-item"><strong>Duraion:</strong> ${movie.Runtime}</li>
			</ul>
		</div>
      </div>
      `;
      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
