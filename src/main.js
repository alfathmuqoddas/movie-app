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
      console.log(res);
      let movies = res.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3 col-6 mb-4">
            <div class="card" style="width:100%;">
              <img src="${movie.Poster}" class="card-img-top" alt="...">
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
  sessionStorage.setItem("movieID", id);
  window.location = "movie.html";
  return false;
}
