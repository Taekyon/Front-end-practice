const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name:'',
      confirmedName:'',
      lastName: ' San',
    };
  },
  computed: {
    outputFullname
  },
  methods: {
    confirmedInput(event) {
      this.confirmedName = this.name + lastName;
    },
    submitForm(event) {
      alert('Submitted!');
    },

    setName(event) {
      this.name = `${event.target.value}`;
    },

    add(n) {
      this.counter += n;
    },
    reduce(n) {
      this.counter -= n;
    },
    resetInput() {
      this.name = '';
    }
  }
});

app.mount('#events');
