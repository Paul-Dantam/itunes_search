let songFinder = document.querySelector("input");
let songContainer = document.querySelector(".container");
let formSubmitter = document.querySelector(".submit");
const enterKeyCode = 13;

formSubmitter.addEventListener("click", function(e) {
  let url =
    "https://itunes.apple.com/search?term=" + songFinder.value + "&entity=song";
  e.preventDefault();
  axios.get(url).then(function(response) {
    songContainer.innerHTML = ``;
    let data = response.data.results;
    data.forEach(function(data) {
      let searchResults = ``;

      searchResults = `<div class ="returnItem"><a href="${data.previewUrl}"><img class="albumArt" src="${data.artworkUrl100}"></a>
        <div class="songTitle">${data.trackName}</div>
        <div class="bandName"><a href="${data.artistViewUrl}">${data.artistName}</a></div>
        </div>
        `;

      songContainer.innerHTML += searchResults;
    });
  });
});
