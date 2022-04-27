//import axios from "axios";
//import VueAxios from 'vue-axios'

const exportExC = {
  state: {
    linkExport: "https://localhost:44392/api/v1/employees/export",
  },
  getters: {
    linkExport: (state) => state.linkExport,
  },
  actions: {},
};

export default exportExC;
