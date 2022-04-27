const popupDetails = {
  state: {
    //true: popup đang đuocwj hiện
    isShowPopupDetails: false,
    //1 : thêm, 2 : sửa
    modeStore: 1,

    //1: cất, 2: cất và thêm
    typeStore: 1,

    //message lỗi sẽ được hiện trên dialog lỗi, ..
    errMessage: "",
    validates: {},
    employeeCheckChanged: {},
  },
  getters: {
    isShowPopupDetails: (state) => state.isShowPopupDetails,
    employeeCheckChanged: (state) => state.employeeCheckChanged,
    errMessage: (state) => state.errMessage,
    modeStore: (state) => state.modeStore,
    validates: (state) => state.validates,
    typeStore: (state) => state.typeStore,
  },
  employeeCheckChanged: {},
  mutations: {
    SET_TYPE_STORE(state, value) {
      state.typeStore = value;
    },
    SET_ISSHOW_POPUP_DETAILS(state, value) {
      state.isShowPopupDetails = value;
    },
    SET_ERR_MESSAGE(state, value) {
      state.errMessage = value;
    },
    SET_MODE_STORE(state, value) {
      state.modeStore = value;
    },
    SET_VALIDATES(state, value) {
      state.validates = { ...value };
    },
    SET_EMPLOYEE_CHECK_CHANGED(state, value) {
      state.employeeCheckChanged = value;
    },
  },
};

export default popupDetails;
