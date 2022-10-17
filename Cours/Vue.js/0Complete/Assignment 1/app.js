const app = Vue.createApp({
  data() {
    return {
      name: "Taekyon",
      age: 21,
      imageUrl: "https://picsum.photos/seed/picsum/200",
    };
  },
  computed: {
    olderAge() {
      return this.age + 5;
    },
    randomIntegrer() {
      return Math.floor(Math.random() * 10) + 1; // between 1 and n
    },
  },
  methods: {},
});
app.mount("#assignment");
