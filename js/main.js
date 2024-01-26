(() => {
  const mainDiv = document.querySelector(".main-div");
  const characterBox = document.querySelector("#character-box");
  const filmTemplate = document.querySelector("#movie-template");
  const filmCon = document.querySelector("#film-con");
  const filmBox = document.querySelector("#film-box");
  const baseUrl = `https://swapi.dev/api/`;

  function getCharacters() {
    fetch(`${baseUrl}people/?page=2`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response.results);
        const character = response.results;
        const ul = document.createElement("ul");
        character.forEach((movie) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          //  console.log(movie.name);
          //console.log(movie.films[0]);
          a.classList.add("character-link");

          a.textContent = movie["name"];
          a.dataset.film = movie.films[0];

          li.appendChild(a);
          ul.appendChild(li);
        });
        characterBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach((link) => {
          link.addEventListener("click", getFilm);
        });
      })
      .catch((error) => {
        console.error(
          "You don't have internet or your internet is slow, try again later.",
          error
        );
        mainDiv.classList.add("error-style");
        mainDiv.classList.remove("grid-con");
        mainDiv.innerHTML =
          "Error.<br>Some data requirements failed to load.<br>Please try again later.";
      });
  }
  function getFilm(e) {
    const filmID = e.currentTarget.dataset.film;
    //https://swapi.dev/api/films/1/

    fetch(`${filmID}`)
      .then((response) => response.json())
      .then(function (response) {
        filmCon.innerHTML = "";
        //  filmBox.innerHTML = "";

        const template = document.importNode(filmTemplate.content, true);

        const reviewBody = template.querySelector(".review-description");
        const movieTitle = template.querySelector(".movie-title");
        const img = document.createElement("img");

        movieTitle.innerHTML = response.title;
        reviewBody.innerHTML = response.opening_crawl;
        img.src = `images/${response.episode_id}.jpg`;

        template.appendChild(img);
        filmCon.appendChild(template);
      })
      .catch((error) => {
        console.error(
          "You don't have internet or your internet is slow, try again later.",
          error
        );
        mainDiv.classList.add("error-style");
        mainDiv.classList.remove("grid-con");
        mainDiv.innerHTML =
          "Error.<br>Some data requirements failed to load.<br>Please try again later.";
      });
  }

  getCharacters();
})();
