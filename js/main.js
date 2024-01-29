(() => {
  const mainDiv = document.querySelector(".main-div");
  const characterBox = document.querySelector("#character-box");
  const filmTemplate = document.querySelector("#movie-template");
  const filmCon = document.querySelector("#film-con");
  const filmBox = document.querySelector("#film-box");
  const spinner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#d5cfb6" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
  </circle>
  <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#9d9974" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
  </circle>
  <!-- [ldio] generated by https://loading.io/ --></svg>`;
  gsap.set("#film-box", { autoAlpha: 0, x: -200 });
  const baseUrl = `https://swapi.dev/api/`;

  function getCharacters() {
    addSpinner();
    fetch(`${baseUrl}people/?page=2`)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response.results);
        const character = response.results;
        const ul = document.createElement("ul");

        character.forEach((movie) => {
          const li = document.createElement("li");
          const a = document.createElement("a");

          a.classList.add("character-link");
          a.textContent = movie["name"];
          a.dataset.film = movie.films[0];

          li.appendChild(a);
          ul.appendChild(li);
        });

        removeSpinner();
        characterBox.appendChild(ul);
      })
      .then(function () {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach((link) => {
          link.addEventListener("click", function (e) {
            getFilm(e);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        handleFetchError();
      });
  }

  function getFilm(e) {
    const filmID = e.currentTarget.dataset.film;

    gsap.to("#film-box", {
      duration: 0.5,
      autoAlpha: 0,
      x: -200,
      onComplete: function () {
        fetchFilmDetails(filmID);
      },
    });
  }

  function fetchFilmDetails(filmID) {
    fetch(`${filmID}`)
      .then((response) => response.json())
      .then(function (response) {
        const template = document.importNode(filmTemplate.content, true);
        const reviewBody = template.querySelector(".review-description");
        const movieTitle = template.querySelector(".movie-title");
        const img = document.createElement("img");

        movieTitle.innerHTML = response.title;
        reviewBody.innerHTML = response.opening_crawl;
        img.src = `images/${response.episode_id}.jpg`;

        template.appendChild(img);
        filmCon.innerHTML = "";
        filmCon.appendChild(template);

        gsap.to("#film-box", {
          duration: 0.5,
          autoAlpha: 1,
          x: 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching film details:", error);
        handleFetchError();
      });
  }

  function handleFetchError() {
    mainDiv.classList.add("error-style");
    mainDiv.classList.remove("grid-con");
    mainDiv.innerHTML =
      "Error.<br>Some data requirements failed to load.<br>Please try again later.";
  }
  function addSpinner() {
    characterBox.innerHTML = spinner;
  }

  function removeSpinner() {
    characterBox.innerHTML = "";
  }

  getCharacters();
})();
