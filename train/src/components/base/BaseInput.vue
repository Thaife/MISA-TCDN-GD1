<template>
  <div class="base-input" :style="{ width: width, height: height }">
    <input
      ref="base_input"
      :class="['input', { input_search: search }]"
      :placeholder="placeholder"
      :type="type"
      :title="createTitleInput"
      @focus="handleFocusInput"
      @keydown="handleKeyDownInput"
      v-model="inputValue"
      :tabindex="tabIndex"
    />
    <div class="base-input-search" v-show="search">
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "base-input",
  props: [
    "type",
    "width",
    "height",
    "placeholder",
    "search",
    "field",
    "value",
    "autofocus",
    "tabIndex",
  ],
  data() {
    return { inputValue: "" };
  },
  computed: {
    ...mapGetters(["errMessage", "validates", "isShowPopupDetails", "newCode"]),
    createTitleInput() {
      //NếU object validates có field trùng với input => bind title vào input
      if (this.validates[this.field]) {
        return this.errMessage;
      }
      return "";
    },
  },
  filters: {},
  watch: {
    //auto binding khi typing input
    inputValue(value) {
      this.$emit("input", value);
    },
    //auto binding khi value input chuyển vào được thay đổi
    value(value) {
      this.inputValue = value;
    },
    //bind employeeCode mới vào input EmployeeCode và focus
    newCode(value) {
      if (value && this.autofocus) {
        this.$emit("input", value);
        this.$refs.base_input.focus();
      }
    },
  },
  methods: {
    ...mapMutations(["SET_VALIDATES"]),
    //khi focus vào input
    handleFocusInput() {
      //bỏ trạng thái error ở input
      const fie = this.field;
      let newObj = {};
      newObj[fie] = false;
      this.SET_VALIDATES({ ...this.validates, ...newObj });
    },
    handleKeyDownInput(e) {
      //emit call handleSearch khi ấn Enter
      if (e.keyCode == 13) {
        this.$emit("handleSearch", this.inputValue);
      }
    },
  },
};
</script>

<style scoped>
.base-input {
  position: relative;
  font-size: 1.3rem;
  box-sizing: border-box;
}
.base-input > input::placeholder {
  font-style: italic;
}
input {
  border: 1px solid rgb(180, 180, 180);
  border-radius: 2px;
  height: 100%;
  outline: none;
  padding: 0 8px;
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
}
input.input_search {
  padding-right: 40px;
}
input::placeholder {
  font-size: 1.2rem;
}
input:focus {
  border: 1px solid green;
}
.base-input-search {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input-search > div {
  background: url("../../assets/Resource/img/Sprites.64af8f61.svg") no-repeat -992px -360px;
  width: 16px;
  height: 16px;
}
</style>
