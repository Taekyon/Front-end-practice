//-----CODE NON DRY------

let personne1 = "Jean";
let personne2 = "Paul";
let personne3 = "Marcel";

/*  On met la première lettre en majuscule,
    on salue la première personne et on donne
    le nombre de lettre dans son prénom */
function saluer(personne) {
  prenom = personne[0].toUpperCase() + personne.substr(1);
  const longueurPrenom = prenom.length;
  console.log(`Bonjour ${prenom}, ton prénom contient ${longueurPrenom} lettres`);
}

saluer(personne1);
saluer(personne2);
saluer(personne3);

//-----CODE MAL NOMMÉ------

//tableau des ages des élèves dans la classe
const Eleves = [14, 14, 15, 14, 16, 14, 14, 13];

// Nombre d'élèves
const nombreEleves = Eleves.length;

// variable pour calculer la somme des ages
let sommeAges = 0;
for (let age of Eleves) {
  sommeAges += age;
}
//moyenne d'age dans la classe
const moyenneEleves = sommeAges / nombreEleves;
console.log("Il y a " + nombreEleves + " élèves dans la classe et la moyenne d'age est " + moyenneEleves);

//-----CODE MAL MIS EN FORME------
const temperature = 25;

if (temperature < 10) {
  console.log("Il fait très froid");
} else if (temperature < 0) {
  console.log("Il fait froid");
} else if (temperature < 10) {
  console.log("Il fait frais");
} else if (temperature < 20) {
  console.log("Il fait doux");
} else if (temperature < 30) {
  console.log("Il fait bon");
} else {
  console.log("Il fait chaud");
}