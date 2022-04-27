<template>
  <div class="view-loading" v-show="isLoading">
    <div :class="['view-loading-icon', { rotate: isLoading }]"></div>
  </div>
</template>

<script>
export default {
  name: "view-loading",
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style scoped>
.view-loading {
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(71, 71, 71, 0.3);
}
.view-loading-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  background: url("../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1546px -254px;
  width: 20px;
  height: 20px;
}

@keyframes rotateLoading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.view-loading-icon.rotate {
  animation: rotateLoading 1s linear infinite;
}
</style>
