<template>
  <div class="view-dialog-wrap" v-show="isShowDialogConfirm">
    <div class="view-dialog view-dialog-confirm">
      <div class="dialog__container">
        <div class="up">
          <div class="icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogConfirm }}</div>
        </div>
        <div class="down">
          <div @click="SET_ISSHOW_DIALOG_CONFIRM({ isShow: false })">
            <BaseButton text="Không" height="36px" />
          </div>
          <dir @click="handleRemoveEmployee">
            <BaseButton text="Có" height="36px" :mainType="true" />
          </dir>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  name: "dialog-err",
  components: {
    BaseButton,
  },
  props: ["text"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "isShowDialogConfirm",
      "messageDialogConfirm",
      "employeeIdRemove",
      "listIdsSelected",
    ]),
  },
  watch: {
    //reset lại id để xoá về null khi đóng dialog
    isShowDialogConfirm(value) {
      if (!value) {
        this.SET_EMPLOYEEID_REMOVE(null);
      }
    },
  },
  methods: {
    ...mapMutations(["SET_ISSHOW_DIALOG_CONFIRM", "SET_EMPLOYEEID_REMOVE"]),
    ...mapActions(["deleteEmployee", "deleteMultiEmployee"]),
    handleRemoveEmployee() {
      if (
        (this.employeeIdRemove && !this.employeeIdReplica) ||
        (!this.employeeIdRemove && this.employeeIdReplica)
      ) {
        this.deleteEmployee(this.employeeIdRemove);
      } else {
        this.deleteMultiEmployee(this.listIdsSelected);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/dialog.scss";
</style>
