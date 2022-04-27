<template>
  <div class="container">
    <router-view></router-view>
    <Loading />
  </div>
</template>

<script>
import Loading from "../../views/loading.vue";
export default {
  name: "c-container",
  components: {
    Loading,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../style/layout/container.scss";
</style>
