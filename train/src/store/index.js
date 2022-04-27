import Vue from "vue";
import Vuex from "vuex";
import loading from "./modules/loading";
import employees from "./modules/employees";
import units from "./modules/units";
import popupDetails from "./modules/popupDetails";
import dialog from "./modules/dialog";
import exportExc from "./modules/exportExc";
//
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(Vuex, VueAxios, axios);

export default new Vuex.Store({
  modules: {
    units,
    employees,
    popupDetails,
    dialog,
    loading,
    exportExc,
  },
});
