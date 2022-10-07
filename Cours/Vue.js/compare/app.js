// Vue.js way
Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: "",
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
      this.enteredValue = "";
    },
  },
}).mount("#app");

// js way
// const buttonLe = document.querySelector('button');
// const inputLe = document.querySelector('input');
// const listLe = document.querySelector('ul');

// function addGoal() {
//     const enteredValue = inputLe.value;
//     const listItemLe = document.createElement('li');
//     listItemLe.textContent = enteredValue;
//     listLe.appendChild(listItemLe);
//     inputLe.value= '';
// }

// buttonLe.addEventListener('click', addGoal);