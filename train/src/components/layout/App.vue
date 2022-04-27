<template>
  <div class="app">
    <SideBar />
    <Container />
  </div>
</template>

<script>
import Container from "./Container.vue";
import SideBar from "./SideBar.vue";
export default {
  components: { SideBar, Container },
};
</script>

<style lang="scss">
@import "../../style/common/common.scss";
.app {
  display: flex;
  height: 100vh;
}
</style>
