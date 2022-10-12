// import d'une moviesRenamed, qu'on a trier par ordre alphabétique.
/* ALT
 * const moviesRenamed = require("./moviesRenamed/movies"); */
import moviesRenamed from "./movies.js";

console.log(moviesRenamed[13], moviesRenamed[15], moviesRenamed[17]); // Test
document.querySelector("movies-List");
const moviesList = movies;

// main app
const binarySearch = (moviesRenamed, thingToFind, start, end) => {
    if (start > end) {
        return false;
    }
    
    let mid = Math.floor((start + end) / 2);
    if (moviesRenamed[mid] === thingToFind) {
        return true;
    }
    
    if (thingToFind < moviesRenamed[mid]) {
        return binarySearch(moviesRenamed, thingToFind, start, mid - 1);
    
    } else {
    
        return binarySearch(moviesRenamed, thingToFind, mid + 1, end);
    }
}