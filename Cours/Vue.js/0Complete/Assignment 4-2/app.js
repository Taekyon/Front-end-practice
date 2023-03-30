const app = Vue.createApp({
  data() {
    return {
      inputClass: "",
      paragraphIsVisible: true,
      inputInlineClasse: "",
    };
  },
  computed: {
    paraClasses() {
      return {
        user1: this.inputClass === "1",
        user2: this.inputClass === "2",
        visible: this.paragraphIsVisible,
        hidden: !this.paragraphIsVisible,
      };
    },
  },
  methods: {
    toggleParagraphVisibility() {
      this.paragraphIsVisible = !this.paragraphIsVisible;
    },
  },
});

app.mount("#assignment");
