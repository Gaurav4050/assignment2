document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    searchMovies(searchInput);
  });

function searchMovies(query) {
  axios
    .get(`http://localhost:3000/search?query=${query}`)
    .then((response) => {
      console.log(response.data);
      displayResults(response.data);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  results.forEach((result) => {
    const resultDiv = document.createElement("div");
    resultDiv.className = "card mb-3";
    resultDiv.innerHTML = `
        <div class="row g-0">
          <div class="col-md-2 ">
            <img src="${result.poster}" class="img-fluid custom-img-height" alt="${result.title}">
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">${result.title} (${result.year})</h5>
              <p class="card-text">${result.type}</p>
              <button class="btn btn-outline-danger" onclick="favoriteMovie('${result.title}', '${result.year}', '${result.type}', '${result.poster}')">Favorite</button>
            </div>
          </div>
        </div>
      `;
    resultsDiv.appendChild(resultDiv);
  });
}

function favoriteMovie(title, year, type, poster) {
  console.log(title, year, type, poster);
  axios
    .post("http://localhost:3000/favorite", { title, year, type, poster })
    .then((response) => {
      displayAlert("Movie favorited!", "success");
    })
    .catch((error) => {
      displayAlert("Error favoriting movie", "danger");
      console.error("Error favoriting movie:", error);
    });
}

function displayAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert custom-alert alert-${type}`;
  alertDiv.innerHTML = message;
  alertContainer.appendChild(alertDiv);
  setTimeout(() => {
    alertDiv.remove();
  }, 2000);
}
