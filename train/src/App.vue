<template>
  <v-app>
    <App />
  </v-app>
</template>

<script>
import App from "./components/layout/App.vue";
export default {
  name: "r-App",
  components: {
    App,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="css">
@import "./style/common/font.css";
@import "./style/common/vuetify.scss";
</style>
