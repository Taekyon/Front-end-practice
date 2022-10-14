// import d'une var moviesRenamed, qu'on a trier par ordre alphabétique.
/* ALT
 * const moviesRenamed = require("./moviesRenamed/movies"); */
// import moviesRenamed from "./movies.js";
const moviesDummies = ["Schindler's List", "Il buono, il brutto, il cattivo", "Fight Club", "Forrest Gump", "Inception", "One Flew Over the Cuckoo's Nest", "Goodfellas", "Shichinin no samurai", "Se7en", "La vita è bella"];

const moviesTotal = moviesDummies.length;
console.log(`${moviesDummies[0]}, ${moviesDummies[4]}, ${moviesDummies[moviesTotal - 1]}.
nombre de films: ${moviesTotal}.`); // Test
document.querySelector("movies-List");

// main app
const binarySearch = (moviesDummies, thingToFind, start, end) => {
    if (start > end) {
        return false;
    }
    
    let mid = Math.floor((start + end) / 2);
    if (moviesDummies[mid] === thingToFind) {
        return true;
    }
    
    if (thingToFind < moviesDummies[mid]) {
        return binarySearch(moviesDummies, thingToFind, start, mid - 1);
    
    } else {
    
        return binarySearch(moviesDummies, thingToFind, mid + 1, end);
    }
}