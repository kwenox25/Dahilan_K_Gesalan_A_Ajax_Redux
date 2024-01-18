(() => {
  const movieBox = document.querySelector("#character-box");
  const reviewTemplate = document.querySelector("#movie-template");
  const reviewCon = document.querySelector("#review-con");
  const baseUrl = `https://swapi.dev/api/people/`;

  function getMovies() {
    fetch(`${baseUrl}?page=2`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response.results);
        const movies = response.results;
        const ul = document.createElement("ul");
        movies.forEach((movie) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          //  console.log(movie.name);
          //console.log(movie.films[0]);

          a.textContent = movie["name"];
          a.dataset.film = movie.films[0];

          li.appendChild(a);
          ul.appendChild(li);
        });
        movieBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach((link) => {
          link.addEventListener("click", getReview);
        });
      })
      .catch((error) => {
        console.log(error);
        //ideally we would write to the DOM and let user know,something is wrong
      });
  }
  function getReview(e) {
    const reviewID = e.currentTarget.dataset.film;
    //https://swapi.dev/api/films/1/

    fetch(`${reviewID}`)
      .then((response) => response.json())
      .then(function (response) {
        reviewCon.innerHTML = "";

        const template = document.importNode(reviewTemplate.content, true);

        const reviewBody = template.querySelector(".review-description");
        const movieTitle = template.querySelector(".movie-title");

        movieTitle.innerHTML = response.title;
        reviewBody.innerHTML = response.opening_crawl;

        // reviewBody.innerHTML = response.title;
        reviewCon.appendChild(template);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMovies();
})();
