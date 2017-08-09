let songFinder = document.querySelector("input");
let songContainer = document.querySelector(".container");
const enterKeyCode = 13;

songFinder.addEventListener("keydown", function(e) {
  let url =
    "https://itunes.apple.com/search?term=" + songFinder.value + "&entity=song";

  if (event.keyCode === enterKeyCode) {
    axios.get(url).then(function(response) {
      let data = response.resultCount.results;
      data.forEach(function(data) {
        let searchResults = ``;
        searchResults = ``;

        songContainer.innerHTML += searchResults;
      });
    });
  }
});
