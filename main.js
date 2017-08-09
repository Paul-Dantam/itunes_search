let recipeSearch = document.querySelector("input");
let recipeContainer = document.querySelector(".container");
const enterKeyCode = 13;

recipeSearch.addEventListener("keydown", function(e) {
  let url =
    "http://recipepuppyproxy.herokuapp.com/api/?q=" + recipeSearch.value;

  if (event.keyCode === enterKeyCode) {
    axios.get(url).then(function(response) {
      let data = response.data.results;
      data.forEach(function(data) {
        let searchResults = ``;
        searchResults = `
            <div class="recipe" style="background-image: url(${data.thumbnail}), 
            url(https://www.placecage.com/c/140/200)"><p class="recipeTitle"><a href="${data.href}">${data.title}</a></p>
            </div>`;

        recipeContainer.innerHTML += searchResults;
      });
    });
  }
});
