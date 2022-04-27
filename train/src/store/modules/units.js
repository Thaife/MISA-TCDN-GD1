import axios from "axios";
//import VueAxios from 'vue-axios'

const units = {
  state: {
    //phòng ban đang được chọn
    unitSelected: null,
    //list phòng ban
    units: [],
  },
  getters: {
    units: (state) => state.units,
    unitSelected: (state) => state.unitSelected,
  },
  actions: {
    async getUnits({ commit }) {
      try {
        let dataRespon = await [
          {
            UnitId: "unit-01",
            UnitName: "Phòng nhân sự",
          },
          {
            UnitId: "unit-02",
            UnitName: "Phòng giám đốc",
          },
        ];
        dataRespon = await axios
          .get("https://localhost:44392/api/v1/Units")
          .then((response) => {
            return response.data;
          });
        commit("GET_UNITS", dataRespon);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    GET_UNITS(state, dataRespon) {
      state.units = dataRespon;
    },
    SET_UNIT_SELECTED(state, unit) {
      state.unitSelected = unit;
    },
  },
};

export default units;
