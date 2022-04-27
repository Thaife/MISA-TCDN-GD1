<template>
  <div class="view-dialog-wrap" v-show="isShowDialogNotify">
    <div class="view-dialog view-dialog-notify">
      <div class="dialog__container">
        <div class="up">
          <div class="icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogNotifi }}</div>
        </div>
        <div class="down">
          <div @click="SET_ISSHOW_DIALOG_NOTIFI({ isShow: false })">
            <BaseButton
              text="Đồng ý"
              height="36px"
              :mainType="true"
              @handleKeyDown="handleKeyDown"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  name: "dialog-notifi",
  components: {
    BaseButton,
  },
  props: ["text"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isShowDialogNotify", "messageDialogNotifi"]),
  },
  methods: {
    ...mapMutations(["SET_ISSHOW_DIALOG_NOTIFI"]),
    handleKeyDown() {
      this.SET_ISSHOW_DIALOG_NOTIFI({ isShow: false });
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/dialog.scss";
</style>
