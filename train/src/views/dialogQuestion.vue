<template>
  <div class="view-dialog-wrap" v-show="isShowDialogQuestion">
    <div class="view-dialog view-dialog-question">
      <div class="dialog__container">
        <div class="up">
          <div class="icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogQuestion }}</div>
        </div>
        <div class="down">
          <div @click="SET_ISSHOW_DIALOG_QUESTION({ isShow: false })">
            <BaseButton
              text="Huỷ"
              height="36px"
              @handleKeyDown="handleKeyDownCancel"
              ref="btnCancel"
            />
          </div>
          <div class="right">
            <div class="btn-1" @click="handleNotCF">
              <BaseButton
                text="Không"
                height="36px"
                @handleKeyDown="handleNotCF"
              />
            </div>
            <div class="btn-2" @click="handleCF">
              <BaseButton
                text="Có"
                height="36px"
                :mainType="true"
                @handleKeyDown="handleCF"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
export default {
  name: "dialog-question",
  components: {
    BaseButton,
  },
  props: ["text"],
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapGetters([
      "isShowDialogQuestion",
      "messageDialogQuestion",
      "i_employee",
      "typeStore",
      "errMessage",
    ]),
  },
  watch: {
    isShowDialogQuestion(value) {
      if (value) {
        console.log(this.$refs.btnCancel.$el);
        this.$refs.btnCancel.$el.focus();
      }
    },
  },
  methods: {
    ...mapMutations([
      "SET_ISSHOW_DIALOG_QUESTION",
      "SET_ISSHOW_POPUP_DETAILS",
      "SET_ISSHOW_DIALOG_ERR",
      "SET_VALIDATES",
      "SET_ERR_MESSAGE",
    ]),
    ...mapActions(["addEmployee", "addEmployeeAndGet"]),
    validate(employee) {
      //Định dạng giá trị giới tính
      employee.Gender = parseInt(employee.Gender);
      //Kiểm tra đơn vị không được trống
      if (!employee.EmployeeCode) {
        this.SET_VALIDATES({
          EmployeeCode: true,
          EmployeeNameTitle: "Mã nhân viên không được để trống",
        });
        // this.validates.EmployeeCode = true;
        // this.validates.EmployeeCodeTitle = "Mã nhân viên không được để trống.";
        this.SET_ERR_MESSAGE("Mã nhân viên không được để trống.");
        return false;
      }
      //Kiểm tra tên không được trống và phải đúng định dạng
      if (!employee.FullName) {
        // this.validates.FullName = true;
        // this.validates.FullNameTitle = "Họ tên không được để trống.";
        this.SET_VALIDATES({
          FullName: true,
          FullNameTile: "Họ tên không được để trống.",
        });
        this.SET_ERR_MESSAGE("Họ tên không được để trống.");
        return false;
      } else {
        const nameRegex = /[0-9.-]/;
        if (nameRegex.test(employee.FullName)) {
          // this.validates.FullName = true;
          // this.validates.FullNameTitle = "Họ tên không hợp lệ.";
          this.SET_VALIDATES({
            FullName: true,
            FullNameTile: "Họ tên không hợp lệ.",
          });
          this.SET_ERR_MESSAGE("Họ tên không hợp lệ.");
          return false;
        }
      }
      //Kiểm tra ngày nghỉ việc có lớn hơn ngày hiện tại k
      if (employee.DateOfBirth) {
        var dateOfBirth = new Date(employee.DateOfBirth);
        if (dateOfBirth > new Date()) {
          // this.validates.DateOfBirth = true;
          // this.validates.DateOfBirthTitle =
          //   "Ngày sinh được lớn hơn ngày hiện tại.";
          this.SET_VALIDATES({
            DateOfBirth: true,
            DateOfBirthTitle: "Ngày sinh được lớn hơn ngày hiện tại.",
          });
          this.SET_ERR_MESSAGE("Ngày sinh được lớn hơn ngày hiện tại.");
          return false;
        }
      }
      //Kiểm tra đơn vị không được trống
      if (!employee.UnitId) {
        // this.validates.Unit = true;
        // this.validates.UnitTitle = "Đơn vị không được để trống.";
        this.SET_VALIDATES({
          Unit: true,
          UnitTile: "Đơn vị không được để trống.",
        });
        this.SET_ERR_MESSAGE("Đơn vị không được để trống.");
        return false;
      }
      //Kiểm tra số điện thoại đúng định dạng của VietNam k
      if (employee.PhoneNumber) {
        const phoneNbRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneNbRegex.test(employee.PhoneNumber)) {
          // this.validates.Phone = true;
          // this.validates.PhoneTitle = "Số điện thoại sai định dạng.";
          this.SET_VALIDATES({
            PhoneNumber: true,
            PhoneNumberTile: "Số điện thoại sai định dạng.",
          });
          this.SET_ERR_MESSAGE("Số điện thoại sai định dạng.");
          return false;
        }
      }
      //Kiểm tra Email đúng định dạng k
      if (employee.Email) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!emailRegex.test(employee.Email)) {
          // this.validates.Email = true;
          // this.validates.EmailTitle = "Email sai định dạng.";
          this.SET_ERR_MESSAGE("Email sai định dạng.");
          this.SET_VALIDATES({
            Email: true,
            EmailTile: "Email sai định dạng.",
          });
          return false;
        }
      }
      //Kiểm tra ngày nghỉ việc có lớn hơn ngày hiện tại k
      if (employee.DateIdentityCard) {
        var dateIdentityCard = new Date(employee.DateIdentityCard);
        if (dateIdentityCard > new Date()) {
          // this.validates.DateIdentityCard = true;
          // this.validates.DateIdentityCard =
          //   "Ngày cấp không được lớn hơn ngày hiện tại.";
          this.SET_VALIDATES({
            DateIdentityCard: true,
            DateIdentityCardTile: "Ngày cấp không được lớn hơn ngày hiện tại.",
          });
          this.SET_ERR_MESSAGE("Ngày cấp không được lớn hơn ngày hiện tại.");
          return false;
        }
      }
      //Trả về true nếu validate thành công
      return true;
    },
    handleKeyDownCancel() {
      this.SET_ISSHOW_DIALOG_QUESTION({ isShow: false });
    },
    handleNotCF() {
      this.SET_ISSHOW_DIALOG_QUESTION({ isShow: false });
      this.SET_ISSHOW_POPUP_DETAILS(false);
    },
    handleCF() {
      this.SET_ISSHOW_DIALOG_QUESTION({ isShow: false });
      if (!this.validate(this.i_employee)) {
        this.SET_ISSHOW_DIALOG_ERR({ isShow: "true", mess: this.errMessage });
      } else {
        this.addEmployee(this.i_employee);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/dialog.scss";
</style>
