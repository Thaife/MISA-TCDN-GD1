<template>
  <div class="base-select" :style="{ minWidth: width, height: height }">
    {{ itemDefault.text }}
    <div class="base-select__box" v-show="isShow">
      <div
        class="base-select__item"
        v-for="(item, index) in items"
        :key="index"
        :style="{ width: width, height: height }"
        @click="handleClickItem(item)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="icon" @click="isShow = !isShow">
      <div :class="{ show: isShow }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-select",
  props: ["width", "height", "items", "itemDefault"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    handleClickItem(item) {
      this.isShow = false;
      this.$emit("input", item);
    },
  },
};
</script>

<style lang="scss">
.base-select {
  position: relative;
  outline: none;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 2px;
  height: 24px;
  width: 160px;
  line-height: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 30px;
  cursor: pointer;
  &__box {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: calc(100% + 4px);
    left: 0;
    box-shadow: 0 0 4px rgb(82, 82, 82);
    width: 100%;
  }
  &__item {
    height: 30px;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 30px;
    &:hover {
      background-color: rgb(200, 248, 200);
    }
  }
  & .icon {
    cursor: pointer;
    position: absolute;
    width: 30px;
    height: 100%;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    & div {
      background: url("../../assets/Resource/img/Sprites.64af8f61.svg")
        no-repeat -564px -365px;
      width: 8px;
      height: 5px;
      transition: linear 0.2s;
      &.show {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
