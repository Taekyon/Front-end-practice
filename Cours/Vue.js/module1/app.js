const app = Vue.createApp({
  data() {
    return {
      courseGoalA: 'Finish this thing',
      courseGoalB: 'Finish other things',
      vueLink: 'https://vuejs.org/'
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    }
  }
});

app.mount('#user-goal');