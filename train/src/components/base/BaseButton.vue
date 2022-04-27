<template>
  <div
    :class="['base-button', { 'base-button-main': mainType }]"
    :style="{ height: height }"
    :tabindex="tabIndex"
    @keydown="handleKeyDownBtn"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "base-button",
  props: ["text", "height", "mainType", "tabIndex"],
  methods: {
    handleKeyDownBtn(e) {
      if (e.keyCode == 13) {
        console.log(e.keyCode);
        this.$emit("handleKeyDown");
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../style/common/help.scss";
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 1.3rem;
  padding: 2px 16px;
  cursor: pointer;
  border: 1px solid #8d9096;
  font-family: notosansSemiBold;
  white-space: nowrap;
  outline: none;
  &.base-button-main {
    color: white;
    border: none;
    background-color: help.$main-color;
    &:focus {
      background-color: #35bf22;
    }
    &:hover {
      background-color: #35bf22;
    }
  }
  &:focus {
    background-color: #d2d3d6;
  }
  &:hover {
    background-color: #d2d3d6;
  }
}
</style>
