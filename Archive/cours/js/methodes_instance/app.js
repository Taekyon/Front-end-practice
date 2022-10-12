// const buttonWithdraw = document.querySelector("withdraw");
const buttonDeposit = document.querySelector("deposit");
const inputAmount = document.querySelector("input-amount");
const bankInfo = document.querySelector('bankInfo'); //like 'listLe'
// const bankInfo = document.querySelector("bank-info");

// let amount = 

class BankAccount {
    constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
    }
    // permet d'..
    showBalance () {
        // `Solde: ${this.balance} CHF`
        const enteredValue = inputAmount.value; // récupère la valeur rentrée
        console.log(enteredValue);
        const paragraphBalance = document.createElement('p'); // créer un 'p'
        paragraphBalance.textContent = enteredValue; // rempli le 'p' avec la valeur rentrée
        bankInfo.appendChild(paragraphBalance); // 
        inputAmount.value= ''; // 
    }

    deposit(amount) {
        this.balance += amount;
        this.showBalance
    }

    withdraw(amount) {
        if (amount > this.balance) {
            alert("Montant trop élevé !");
        } else {
            console.log("Retrait de " + amount + " EUR"); // Replace
            this.balance -= amount;
            this.showBalance();
        }
    }
}

const newAccount = new BankAccount("Taekyon", 500);

function balanceDeposit() {
//   const enteredValue = inputLe.value;
//   const listItemLe = document.createElement("li");
//   listItemLe.textContent = enteredValue;
//   listLe.appendChild(listItemLe);
//   inputLe.value = "";
}

buttonDeposit.addEventListener("click", deposit);
buttonWithdraw.addEventListener("click", withdraw);


// Print
// paragraph.innerText = `Owner : ${this.owner}
// ${showBalance}`