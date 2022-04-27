<template>
  <div class="base-cbb" :style="{ width: width, height: height }">
    <div class="input__wrap">
      <input
        class="cbb__input"
        @keydown="handleKeyDownInput"
        v-model="displayText"
        @input="handleOnInput"
        :tabindex="tabindex"
      />
      <div class="cbb__icon-wrap" @click="isShowList = !isShowList">
        <div class="cbb__icon-hide" v-show="!isShowList"></div>
        <div class="cbb__icon-show" v-show="isShowList"></div>
      </div>
    </div>
    <div class="cbb__list" v-show="isShowList">
      <div
        class="cbb__list__item"
        v-for="item in dataHandled"
        :key="item[valueName]"
        @click="handleClickItem(item[valueName])"
        :class="{ active: item.active }"
      >
        <span>{{ item[displayName] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-combobox",
  props: [
    "name",
    "width",
    "height",
    "data",
    "valueName",
    "displayName",
    "value",
    "tabindex",
  ],
  data() {
    return {
      isShowList: false,
      displayText: null,
    };
  },
  computed: {
    dataHandled() {
      if (this.data) {
        const arrRes = this.data.map((item) => {
          let isChecked = item[this.valueName] == this.value;
          return { ...item, active: isChecked, isShow: true };
        });
        return arrRes;
      }
      return this.data;
    },
  },
  filters: {},
  watch: {
    value(value) {
      if (value) {
        //combobox có value => lấy ra giá trị sẽ hiển thị
        let selectedOption = this.data.find(
          (item) => item[this.valueName] == value
        );
        //Hiển thị item đc chọn
        this.displayText = selectedOption[this.displayName];
      } else {
        //combobox k có value => gán v_value = null => reset lại input combobox
        this.displayText = null;
      }
    },
    displayText(value) {
      //reset lại input combobox
      if (!value) {
        this.$emit("input", null);
      }
    },
  },
  methods: {
    handleClickItem(value) {
      //Đóng combobox
      this.isShowList = false;
      //Nếu chọn khác giá trị đang được chọn => thay đổi value combobox
      this.$emit("input", value);
    },
    handleKeyDownInput(e) {
      console.log(e);
      switch (e.keyCode) {
        //Enter key
        case 13:
          if (!this.isShowList) {
            this.isShowList = true;
          } else {
            //call lại func chọn item
            this.handleClickItem(this.value);
          }

          break;
        case 37:
          break;
        //Up key
        case 38:
          //Khi đang show list item
          if (this.value) {
            //Lấy item đang được focus
            let currentIndex = this.data.findIndex(
              (option) => option[this.valueName] == this.value
            );
            if (currentIndex == 0) {
              //Nếu item đang được focus là item[0] => focus item cuối
              this.$emit(
                "input",
                this.data[this.data.length - 1][this.valueName]
              );
            } else {
              //focus đến item ở trên(trước)
              this.$emit("input", this.data[currentIndex - 1][this.valueName]);
            }
          } else {
            //Nếu chưa item nào được focus => focus item cuối
            this.$emit(
              "input",
              this.data[this.data.length - 1][this.valueName]
            );
          }
          break;
        case 39:
          break;
        //Down key
        case 40:
          if (this.value) {
            //Lấy ra item đang được focus
            let currentIndex = this.data.findIndex(
              (option) => option[this.valueName] == this.value
            );
            if (currentIndex == this.data.length - 1) {
              //Nếu item đang được focus là item cuối => focus item đầu
              this.$emit("input", this.data[0][this.valueName]);
            } else {
              //focus đến item ở dưới(sau)
              this.$emit("input", this.data[currentIndex + 1][this.valueName]);
            }
          } else {
            //Nếu chưa item nào được focus => focus item đầu
            this.$emit("input", this.data[0][this.valueName]);
          }
          break;
        default:
          break;
      }
    },
    //Hàm xử lý khi gõ, tìm kiếm
    handleOnInput() {
      //Show list item
      this.isShow = true;
      //Lấy ra những item phù hợp với input được nhập
      console.log(this.displayText);
      console.log(this.rootData);
      let selectedOptions = this.rootData.filter((option) => {
        console.log(option[this.displayName]);
        return option[this.displayName]
          .toUpperCase()
          .includes(this.displayText.toUpperCase());
      });
      console.log(selectedOptions);
      //gán lại vào list item
      this.$emit("setDataCbb", selectedOptions);
    },
  },
};
</script>

<style lang="scss">
@import "../../style/base/BaseCombobox.scss";
</style>
