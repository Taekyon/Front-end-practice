const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name:'',
      confirmedName:''
    };
  },
  methods: {
    confirmedInput(event, lastName) {
      this.confirmedName = this.name + lastName;
    },
    submitForm(event) {
      alert('Submitted!');
    },

    /* setName(event, lastName) {
      this.name = `${event.target.value}`;
    }, */

    add(n) {
      this.counter = this.counter + n;
    },
    reduce(n) {
      this.counter = this.counter - n;
    },
    resetInput() {
      this.name = '';
    }
  }
});

app.mount('#events');
