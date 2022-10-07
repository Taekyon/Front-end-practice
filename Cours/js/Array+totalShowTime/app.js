class Episode {
  constructor(title, duration, hasBeenWatched) {
    this.title = title;
    this.duration = duration;
    this.hasBeenWatched = hasBeenWatched;
  }
}

let firstEpisode = new Episode("Dark Beginnings", 45, true);
let secondEpisode = new Episode("The Mystery Continues", 45, false);
let thirdEpisode = new Episode("An Unexpected Climax", 60, false);

// Modify the array here
// ====================================

let episodes = [];
episodes.push(firstEpisode, secondEpisode, thirdEpisode, thirdEpisode);

episodes.pop();

let numberOfEpisodes = episodes.length;

// 2nd part : compter le nombre total de minutes
let totalMinutes = episode.duration;

// ====================================

const body = document.querySelector("body");

document.querySelector("#episodes").innerText = numberOfEpisodes;

for (let episode of episodes) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("series-frame");
  let newTitle = document.createElement("h2");
  newTitle.innerText = "The Story of Tau";
  let newParagraph = document.createElement("p");
  newParagraph.innerText = `${episode.title}
${episode.duration} minutes
${episode.hasBeenWatched ? "Already been watched" : "Not yet watched"}`;
  newDiv.append(newTitle);
  newDiv.append(newParagraph);
  body.append(newDiv);
}
