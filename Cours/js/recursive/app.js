//On pointe sur l'élément de message
const espaceMessage = document.getElementById("message");
//On pointe sur l'élément de bouton
const bouton = document.getElementById("bouton");
//On pointe sur l'élément de champ de saisie
const numberInput = document.getElementById("number");


let number;

//======FONCTION À ECRIRE======
function factorielle(number){
 //coder ici
  if (number === 0) return 1;
  else {
    return (number * factorielle(number-1));
  };
}
//======/FONCTION À ECRIRE======

function onCalcul(){
  //On récupère la saisie et on transforme le texte en nombre entier
  number = parseInt(numberInput.value);
  //Si la saisie n'est pas un nombre, on affiche un message d'erreur
  if(isNaN(number)){
    alert("Ceci n'est pas un nombre");
    return;
  }
  espaceMessage.innerHTML = `La factorielle de ${number} est ${factorielle(number)}`;
}

//On écoute l'action de click sur le onCalcul et on appelle la fonction onCalcul
bouton.addEventListener('click', onCalcul);