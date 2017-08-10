let songFinder = document.querySelector("input");
let songContainer = document.querySelector(".container");
let formSubmitter = document.querySelector(".submit");
let audioPlayer = document.querySelector("#music");
let audioSource = document.querySelectorAll(".albumArt");
let iTunesSource = document.querySelector(".m4asrc");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ search funtionality and grid population ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

formSubmitter.addEventListener("click", function(e) {
  let url =
    "https://itunes.apple.com/search?term=" + songFinder.value + "&entity=song";
  e.preventDefault();
  axios.get(url).then(function(response) {
    songContainer.innerHTML = ``;
    let data = response.data.results;
    data.forEach(function(data) {
      let searchResults = ``;

      searchResults = `<div class ="returnItem"><img class="albumArt" value="${data.previewUrl}" src="${data.artworkUrl100}">
        <div class="songTitle">${data.trackName}</div>
        <div class="bandName"><a href="${data.artistViewUrl}">${data.artistName}</a></div>
        </div>
        `;
      songContainer.innerHTML += searchResults;
      audioSource += document.querySelectorAll(".albumArt");
    });
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~audio player experiment~~~~~~~~~~~~~~~~~~~~~~~~~

var music = document.getElementById("music");
var duration = music.duration;
var pButton = document.getElementById("pButton");
var playhead = document.getElementById("playhead");
var timeline = document.getElementById("timeline");
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

pButton.addEventListener("click", play);

music.addEventListener("timeupdate", timeUpdate, false);

timeline.addEventListener(
  "click",
  function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
  },
  false
);

function clickPercent(event) {
  return (event.clientX - getPosition(timeline)) / timelineWidth;
}

playhead.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);

var onplayhead = false;

function mouseDown() {
  onplayhead = true;
  window.addEventListener("mousemove", moveplayhead, true);
  music.removeEventListener("timeupdate", timeUpdate, false);
}

function mouseUp(event) {
  if (onplayhead == true) {
    moveplayhead(event);
    window.removeEventListener("mousemove", moveplayhead, true);
    music.currentTime = duration * clickPercent(event);
    music.addEventListener("timeupdate", timeUpdate, false);
  }
  onplayhead = false;
}
function moveplayhead(event) {
  var newMargLeft = event.clientX - getPosition(timeline);

  if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
    playhead.style.marginLeft = newMargLeft + "px";
  }
  if (newMargLeft < 0) {
    playhead.style.marginLeft = "0px";
  }
  if (newMargLeft > timelineWidth) {
    playhead.style.marginLeft = timelineWidth + "px";
  }
}

function timeUpdate() {
  var playPercent = timelineWidth * (music.currentTime / duration);
  playhead.style.marginLeft = playPercent + "px";
  if (music.currentTime == duration) {
    pButton.className = "";
    pButton.className = "play";
  }
}

function play() {
  if (music.paused) {
    music.play();
    pButton.className = "";
    pButton.className = "pause";
  } else {
    music.pause();
    pButton.className = "";
    pButton.className = "play";
  }
}

music.addEventListener(
  "canplaythrough",
  function() {
    duration = music.duration;
  },
  false
);

function getPosition(el) {
  return el.getBoundingClientRect().left;
}

// ~~~~~~~~~~~~~~~~~~~~~~Audio source functionality~~~~~~~~~~~~~~~~~~~~~~~
songContainer.addEventListener("click", function(e) {
  let newTrack = e.target.getAttribute("value");
  iTunesSource.setAttribute("src", newTrack);
  audioPlayer.load();
  audioPlayer.play();
});
