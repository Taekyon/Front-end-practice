let numberOfSeasons = 6;
let numberOfEpisodes = 13;

let episodeTime = 47; /* durée total, récupérer en ligne */
let creditTime = 2; /* temps des crédits, à SOUSTRAIRE */
let commercialTime = 5; /* temps des pubs */

// Calculate totalShowTime here
// =====================================

/* real episode time */
let viewableTime = episodeTime - creditTime;

/* SEASON */
let seasonCommercialTime = (numberOfEpisodes - 1) * commercialTime;
let seasonViewableTime = numberOfEpisodes * viewableTime;
let seasonTotalTime = seasonCommercialTime + seasonViewableTime;

let totalShowTime = seasonTotalTime * numberOfSeasons;

// =====================================

let paragraph = document.querySelector('#info');
paragraph.innerText = `${numberOfSeasons} seasons, ${numberOfEpisodes} episodes per season

Total viewing time: ${totalShowTime} minutes`