<template>
  <div
    :class="['base-checkbox', { active: this.value }]"
    :style="{ width: width, height: height }"
    :tabIndex="tabIndex"
    @click="handleClickCheckBox"
    @keydown="handleKeyDown"
  >
    <div class="base-checkbox-point"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "base-checkbox",
  props: ["width", "height", "value", "tabIndex"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isShowPopupDetails"]),
  },
  watch: {
    //reset lại checkbox khi tắt popup
    isShowPopupDetails(value) {
      if (!value) {
        this.$emit("input", 0);
      }
    },
  },
  methods: {
    handleClickCheckBox() {
      if (this.value) {
        this.$emit("input", 0);
      } else {
        this.$emit("input", 1);
      }
    },
    handleKeyDown(e) {
      console.log(e.keyCode);
      if (e.keyCode == 13) {
        if (this.value) {
          this.$emit("input", 0);
        } else {
          this.$emit("input", 1);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@use "../../style/common/help.scss";
.base-checkbox {
  border-radius: 2px;
  border: 1px solid #ccc;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
}
.base-checkbox.active {
  border: 1px solid help.$main-color;
}

.base-checkbox.active .base-checkbox-point {
  background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1225px -363px;
  width: 14px;
  height: 11px;
}
</style>
