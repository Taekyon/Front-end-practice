const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      restart: "",
    };
  },
  computed: {
    result() {
      if (this.counter < 37) {
        return `Not there yet.`;
      } else if (this.counter === 37) {
        return `Good Job, you entered the correct value ! (37)`;
      } else {
        return `Too much !`;
      }
    },
  },
  watch: {
    result() {
      console.log("Watcher executing");
      const that = this;
      // if (this.counter > 37) {
        setTimeout(function () {
          that.counter = 0;
          alert("Restarted");
        }, 3000);
      // }
    },
  },
  methods: {
    add(n) {
      this.counter += n;
    },
  },
});
app.mount("#assignment");
