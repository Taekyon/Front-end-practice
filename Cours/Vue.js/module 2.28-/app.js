const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name: "",
      lastname: "",
      // fullname: "",
    };
  },
  watch: {
    counter(value) {
      if (value < 0) {
        const that = this;
        setTimeout(function () {
          that.counter = 0;
        }, 100);
        console.log("Running function to reset counter (watch)");
      }
    },

    // name(value) {
    //   if (value === "") {
    //     this.fullname = "";
    //   } else {
    //     this.fullname = `${value} ${this.lastname}`;
    //   }
    // },
    // lastname(value) {
    //   if (value === "") {
    //     this.fullname = "";
    //   } else {
    //     this.fullname = `${this.name} ${value}`;
    //   }
    // },
  },
  computed: {
    fullname() {
      console.log("Running function 'fullname'.");
      if (this.name === "" || this.lastname === "") {
        return "";
      }
      return `${this.name} ${this.lastname}`;
    },
  },
  methods: {
    initialValue() {
      this.counter = 10;
    },
    resetInput() {
      console.log("Running function 'resetInput'.");
      this.name = "";
      this.lastname = "";
      return;
    },

    add(n) {
      this.counter += n;
    },
    reduce(n) {
      this.counter -= n;
    },
  },
});
app.mount("#events");