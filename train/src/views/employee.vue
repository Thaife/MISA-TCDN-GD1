<template>
  <div class="employ__container">
    <div class="employ__container__header">
      <div class="left">
        <div class="more"></div>
        <v-select :items="companys" :value="companyDefault" />
      </div>
      <div class="right">
        <div class="bell"></div>
        <div class="avt"></div>
        <div class="user">
          <div class="name">Trần Văn Thái</div>
          <div class="icon"></div>
        </div>
      </div>
    </div>
    <div class="employ__container__content">
      <div class="up">
        <div class="employ__title">Nhân viên</div>
        <div @click="handleClickAdd">
          <base-button
            text="Thêm mới nhân viên"
            minWidth="100px"
            height="38px"
            :mainType="true"
          />
        </div>
      </div>
      <div class="employ__container__table">
        <div class="employ__table__header">
          <div
            class="batch__execution"
            @click="
              () => {
                isShowBatchExecution = !isShowBatchExecution;
              }
            "
          >
            Thực hiện hàng loạt
            <div class="batch__execution__more">
              <div class="batch__execution__icon__wrap">
                <div class="batch__execution__icon"></div>
              </div>
              <div class="batch__execution__box" v-show="isShowBatchExecution">
                <div
                  class="batch__execution__box__item"
                  @click="handleRemoveBatch"
                >
                  Xoá
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <BaseInput
              type="text"
              width="220px"
              height="32px"
              placeholder="Tìm theo mã, tên nhân viên"
              :search="true"
              v-model="textSearch"
              @handleSearch="handleSearch"
            />
            <div class="icon__wrap">
              <div class="icon" @click="getEmployees"></div>
            </div>
            <a :href="linkExport" class="employ__export"></a>
          </div>
        </div>
        <div class="employ__table__wrap">
          <div class="employ__table">
            <table>
              <thead>
                <tr class="table__row__header">
                  <th class="table__check__box">
                    <div class="row__check-box__align">
                      <div
                        :class="[
                          'row__check-box',
                          'txt-center',
                          { active: selectAll },
                        ]"
                        @click="handleClickRowCheckBox('all')"
                      >
                        <div></div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div class="employeeCode txt-left" style="min-width: 120px">
                      MÃ NHÂN VIÊN
                    </div>
                  </th>
                  <th>
                    <div class="fullName txt-left" style="min-width: 140px">
                      TÊN NHÂN VIÊN
                    </div>
                  </th>
                  <th>
                    <div class="genderName txt-left" style="min-width: 80px">
                      GIỚI TÍNH
                    </div>
                  </th>
                  <th><div class="dateOfBirth txt-center">NGÀY SINH</div></th>
                  <th><div class="txt-left">SỐ CMND</div></th>
                  <th>
                    <div class="txt-left" style="min-width: 120px">
                      CHỨC DANH
                    </div>
                  </th>
                  <th>
                    <div class="txt-left" style="min-width: 120px">
                      TÊN ĐƠN VỊ
                    </div>
                  </th>
                  <th><div class="txt-left">SỐ TÀI KHOẢN</div></th>
                  <th>
                    <div class="txt-left" style="min-width: 120px">
                      TÊN NGÂN HÀNG
                    </div>
                  </th>
                  <th>
                    <div class="txt-left" style="min-width: 140px">
                      CHI NHÁNH NGÂN HÀNG
                    </div>
                  </th>
                  <th>CHỨC NĂNG</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="employee in employees"
                  :key="employee.EmployeeId"
                  @dblclick="handledblClickRow($event, employee.EmployeeId)"
                  :class="[
                    {
                      active:
                        listIdsSelected.includes(employee.EmployeeId) ||
                        selectAll,
                    },
                  ]"
                >
                  <td class="row__check-box__align">
                    <div
                      :class="[
                        'row__check-box',
                        'txt-center',
                        {
                          active:
                            listIdsSelected.includes(employee.EmployeeId) ||
                            selectAll,
                        },
                      ]"
                      @click="handleClickRowCheckBox(employee.EmployeeId)"
                    >
                      <div class="row__check-box-b"></div>
                    </div>
                  </td>
                  <td>
                    <div class="employeeCode txt-left">
                      {{ employee.EmployeeCode }}
                    </div>
                  </td>
                  <td>
                    <div class="fullName txt-left">
                      {{ employee.FullName }}
                    </div>
                  </td>
                  <td>
                    <div class="genderName txt-left">
                      {{ employee.GenderName }}
                    </div>
                  </td>
                  <td>
                    <div class="dateOfBirth txt-center">
                      {{ employee.DateOfBirth | formatDate }}
                    </div>
                  </td>
                  <td>
                    <div class="txt-left">{{ employee.IdentityCard }}</div>
                  </td>
                  <td>
                    <div class="txt-left">{{ employee.Position }}</div>
                  </td>
                  <td>
                    <div class="txt-left">{{ employee.UnitName }}</div>
                  </td>
                  <td>
                    <div class="txt-left">{{ employee.BankNumber }}</div>
                  </td>
                  <td>
                    <div class="txt-left">{{ employee.BankName }}</div>
                  </td>
                  <td>
                    <div class="txt-left">{{ employee.BankBranch }}</div>
                  </td>
                  <td>
                    <div class="row__func">
                      <span @click="handleClickUpdate(employee.EmployeeId)"
                        >Sửa</span
                      >
                      <div class="row__func__box" @click.prevent="() => {}">
                        <div
                          :class="[
                            'icon__wrap',
                            { active: idOfShowFunc == employee.EmployeeId },
                          ]"
                          @click="
                            handleClickMoreFunc($event, employee.EmployeeId)
                          "
                        >
                          <div class="icon" @click.prevent="() => {}"></div>
                        </div>
                        <!-- <div
                          :class="[
                            'list__func',
                            { show: idOfShowFunc == employee.EmployeeId },
                          ]"
                        >
                          <div
                            class="list__func__item"
                            @click="
                              handleDblClickReplication(employee.EmployeeId)
                            "
                          >
                            Nhân bản
                          </div>
                          <div
                            class="list__func__item"
                            @click="handleClickRemove(employee.EmployeeId)"
                          >
                            Xoá
                          </div>
                          <div class="list__func__item">Ngừng sử dụng</div>
                        </div> -->
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="employ__paging">
            <div class="left">
              Tổng số <span>{{ totalRecord }}</span> bản ghi
            </div>
            <div class="right">
              <div class="paging__select">
                <BaseSelect
                  v-model="recordInPageDefault"
                  width="200px"
                  height="28px"
                  item-text="text"
                  :items="selectRecordInPage"
                  :itemDefault="recordInPage"
                  return-object
                />
              </div>

              <v-pagination
                :length="totalPage"
                :total-visible="5"
                v-model="page"
                ref="v_paging"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition>
      <div
        class="m-popover"
        id="basePopover"
        v-show="idOfShowFunc"
        :style="{ top: popOverY + 'px', left: popOverX + 'px' }"
      >
        <div class="popover-list" @click="handleClickRemove">Xóa</div>
        <div class="popover-list" @click="handleClickReplication">Nhân bản</div>
        <div class="popover-list">Ngừng</div>
      </div>
    </transition>

    <Popup-Details />
    <DialogNotify />
    <DialogError />
    <DialogQues />
    <DialogCfirm />
    <!-- <PopOver /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/base/BaseButton.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseSelect from "../components/base/BaseSelect.vue";
import DialogNotify from "./dialogNotification.vue";
import DialogError from "./dialogError.vue";
import DialogQues from "./dialogQuestion.vue";
import DialogCfirm from "./dialogConfirm.vue";
import PopupDetails from "./popupDetails.vue";
//import PopOver from "./popOver.vue";

export default {
  components: {
    BaseButton,
    BaseInput,
    PopupDetails,
    BaseSelect,
    DialogError,
    DialogNotify,
    DialogQues,
    DialogCfirm,
    //PopOver,
  },
  name: "view-employee",
  data() {
    return {
      //company
      companys: [
        "Công ty trách nhiệm hữu hạn một thành viên ABC",
        "Công ty MISA",
      ],
      companyDefault: "Công ty trách nhiệm hữu hạn một thành viên ABC",

      //true: hiển thị thực hiện hàng loạt
      isShowBatchExecution: false,

      //Id để show box func
      idOfShowFunc: null,

      //Id Relica
      idRelica: null,

      //Id remove
      idRemove: null,

      //pageSize hiện tại
      recordInPageDefault: null,

      //page mặc định
      page: 1,

      //search
      textSearch: "",

      popOverX: 0,
      popOverY: 0,
    };
  },
  filters: {
    formatDate(inputDate) {
      if (inputDate) {
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
          // Months use 0 index.
          return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
          );
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      "listIdsSelected",
      "employees",
      "employeeIdUpdate",
      "employeeIdRemove",
      "employeeIdRelica",
      "totalRecord",
      "totalPage",
      "currentPage",
      "selectRecordInPage",
      "recordInPage",
      "listIdsSelected",
      "selectAll",
      "linkExport",
    ]),
  },
  watch: {
    //hiện thị popup và bind employee khi click sửa
    employeeIdUpdate(id) {
      if (id) {
        //Chuyển trạng thái => Sửa
        this.SET_MODE_STORE(2);
        this.getEmployeeById(id);
        this.SET_ISSHOW_POPUP_DETAILS(true);
      }
    },
    employeeIdRemove(id) {
      console.log(id);
      // if (id) {
      //   console.log(id);
      //   //Lấy employeeCode ứng với id
      //   let employeeCode = {};
      //   employeeCode = this.employees.find((employee) => {
      //     return employee.EmployeeId == id;
      //   })["EmployeeCode"];
      //   //set thông tin cho dialog xác nhận xoá
      //   this.SET_ISSHOW_DIALOG_CONFIRM({
      //     isShow: true,
      //     mess: `Bạn có thực sự muốn xoá nhân viên <${employeeCode}> không ?`,
      //   });
      // } else {
      //   this.SET_ISSHOW_DIALOG_CONFIRM({
      //     isShow: false,
      //   });
      // }
    },
    employeeIdRelica(id) {
      console.log(id);
      // if (id) {
      //   //Chuyển trạng thái => Sửa
      //   this.SET_MODE_STORE(1);
      //   this.getEmployeeById(id);
      //   this.getNewCode();
      //   this.SET_ISSHOW_POPUP_DETAILS(true);
      // }
    },
    //xử lý click ra ngoài box func
    idOfShowFunc(value) {
      if (value) {
        window.addEventListener("click", this.removeListenerBoxFunc);
      } else {
        window.removeEventListener("click", this.removeListenerBoxFunc);
      }
    },
    //xử lý click ra ngoài BatchExecution
    isShowBatchExecution(value) {
      if (value) {
        window.addEventListener("click", this.removeListenerBatchExecution);
      } else {
        window.removeEventListener("click", this.removeListenerBatchExecution);
      }
    },

    //xử lý khi chuyển lựa chọn pageSize
    recordInPageDefault(value) {
      if (value) {
        this.SET_RECORD_IN_PAGE(value);
        this.SET_PAGE_SIZE(value.value);
        this.SET_CURRENT_PAGE(1);
        this.getEmployees();
        this.page = 1;
      }
    },
    page(value) {
      if (value && value != this.currentPage) {
        this.SET_CURRENT_PAGE(value);
        this.getEmployees();
      }
    },
    currentPage(value) {
      if (value && value != this.page) {
        this.page = value;
      }
    },
  },
  created() {
    this.getEmployees();
    setTimeout(() => {
      let prevElement = document.querySelector(
        "ul.v-pagination li:first-child button"
      );
      let nextElement = document.querySelector(
        "ul.v-pagination li:last-child button"
      );
      if (prevElement && nextElement) {
        prevElement.innerHTML = "<div>Trước</div>";
        nextElement.innerHTML = "<div>Sau</div>";
      }
    }, 0);
  },
  beforeMount() {},
  mounted() {
    console.log(this.$refs.v_paging.$el);
  },

  methods: {
    ...mapActions([
      "getEmployees",
      "deleteEmployee",
      "modeStore",
      "getEmployeeById",
      "exportExC",
      "getNewCode",
      "deleteMultiEmployee",
    ]),
    ...mapMutations([
      "SET_ISSHOW_POPUP_DETAILS",
      "SET_CURRENT_PAGE",
      "SET_PAGE_SIZE",
      "SET_TOTAL_RECORD",
      "SET_MODE_STORE",
      "SET_RECORD_IN_PAGE",
      "SET_TEXT_SEARCH",
      "SET_SELECT_ALL_ROW",
      "SET_LIST_ID_SELECTED",
      "SET_ISSHOW_DIALOG_CONFIRM",
      "SET_EMPLOYEEID_UPDATE",
      "SET_EMPLOYEEID_REMOVE",
      "SET_EMPLOYEE_REPLICA",
      "SET_MODE_STORE",
    ]),

    handledblClickRow(e, id) {
      console.log(e.target);
      if (
        !e.target.classList.contains("row__func__box") &&
        !e.target.classList.contains("icon__wrap") &&
        !e.target.classList.contains("icon") &&
        !e.target.classList.contains("row__check-box__align") &&
        !e.target.classList.contains("row__check-box") &&
        !e.target.classList.contains("row__check-box-b")
      ) {
        console.log("oke");
        this.SET_EMPLOYEEID_UPDATE(id);
      }
    },

    handleClickAdd() {
      this.SET_ISSHOW_POPUP_DETAILS(true);
      this.SET_MODE_STORE(1);
    },

    handleSearch(text) {
      this.SET_CURRENT_PAGE(1);
      this.SET_TEXT_SEARCH(text);
      this.getEmployees();
    },

    handleClickUpdate(id) {
      this.SET_EMPLOYEEID_UPDATE(id);
    },

    handleClickReplication() {
      if (this.employeeIdRelica) {
        //Chuyển trạng thái => Sửa
        this.SET_MODE_STORE(1);
        this.getEmployeeById(this.employeeIdRelica);
        this.SET_ISSHOW_POPUP_DETAILS(true);
        this.SET_EMPLOYEEID_REMOVE(null);
      }
    },

    handleClickRemove() {
      if (this.employeeIdRemove) {
        console.log(this.employeeIdRemove);
        //Lấy employeeCode ứng với id
        let employeeCode = {};
        employeeCode = this.employees.find((employee) => {
          return employee.EmployeeId == this.employeeIdRemove;
        })["EmployeeCode"];
        //set thông tin cho dialog xác nhận xoá
        this.SET_ISSHOW_DIALOG_CONFIRM({
          isShow: true,
          mess: `Bạn có thực sự muốn xoá nhân viên <${employeeCode}> không ?`,
        });
        this.SET_EMPLOYEE_REPLICA(null);
      } else {
        console.log("SET_ISSHOW_DIALOG_CONFIRM---isShow: false");
        this.SET_ISSHOW_DIALOG_CONFIRM({
          isShow: false,
        });
      }
    },

    handleRemoveBatch() {
      if (this.listIdsSelected.length > 0) {
        this.SET_ISSHOW_DIALOG_CONFIRM({
          isShow: true,
          mess: "Bạn có chắc muốn xoá những nhân viên này ?",
        });
      }
    },

    handleClickMoreFunc(e, id) {
      //console.log(e.target);
      if (this.idOfShowFunc && this.idOfShowFunc == id) {
        this.idOfShowFunc = null;
      } else {
        this.idOfShowFunc = id;
      }
      this.popOverX = e.clientX - 106;
      this.popOverY = e.clientY + 14;

      this.SET_EMPLOYEE_REPLICA(id);
      this.SET_EMPLOYEEID_REMOVE(id);
    },
    handleClickRowCheckBox(id) {
      //khi click vào chọn tất cả...
      if (id == "all") {
        this.SET_SELECT_ALL_ROW(!this.selectAll);
        //if bỏ chọn tất cả
        if (!this.selectAll) {
          this.SET_LIST_ID_SELECTED([]);
          //else => chọn tất cả => thêm tất cả id vào list chọn
        } else {
          this.SET_LIST_ID_SELECTED([]);
          let listTotal = [];
          this.employees.forEach((employee) => {
            listTotal.push(employee.EmployeeId);
          });
          this.SET_LIST_ID_SELECTED(listTotal);
        }
        //khi click vào 1 dòng
      } else {
        //Nếu đang chọn thì bỏ chọn, thoát khỏi trạng thái chọn tất cả
        if (this.listIdsSelected.includes(id)) {
          if (this.selectAll == true) {
            this.SET_SELECT_ALL_ROW(false);
          }
          let listTotal = [];
          listTotal = this.listIdsSelected.filter((idItem) => {
            return idItem != id;
          });
          this.SET_LIST_ID_SELECTED(listTotal);
          //Nếu chưa chọn => push vào list
        } else {
          this.SET_LIST_ID_SELECTED([...this.listIdsSelected, id]);
          //Nếu độ dài list = tổng employee đang hiển thị => kích hoạt trạng thái chọn tất cả
          if (this.listIdsSelected.length == this.employees.length) {
            this.SET_SELECT_ALL_ROW(true);
          }
        }
      }
    },
    removeListenerBoxFunc(e) {
      if (
        !(
          e.target.classList.contains("icon") ||
          e.target.classList.contains("icon__wrap")
        )
      ) {
        this.idOfShowFunc = null;
      }
    },
    removeListenerBatchExecution(e) {
      console.log(e);
      if (
        !e.target.classList.contains("batch__execution") &&
        !e.target.classList.contains("batch__execution__icon__wrap") &&
        !e.target.classList.contains("batch__execution__icon")
      ) {
        this.isShowBatchExecution = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/views/employee.scss";
@import "../style/views/table.scss";
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.m-popover {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #babec5;
  border-radius: 2px;
  list-style: none;
  font-size: 12px;
  padding: 0;
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
}

.m-popover > div {
  margin: 0;
  height: 28px;
  width: 120px;
  display: flex;
  align-items: center;
  text-align: start;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: #35bf22;
    background-color: #ebedf0;
  }
}
</style>
