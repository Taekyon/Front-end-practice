const app = Vue.createApp({
  data() {
    return {
      user: "",
    };
  },
  computed: {
    alert() {
      alert('This is an Alert !');
    },
  },
  methods: {
    outputUsername(event) {
      this.user = event.target.value;
    },
  },
});

app.mount("#assignment");