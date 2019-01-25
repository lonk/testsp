import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    employees: []
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
        state.employees = employees;
    }
  },
  actions: {
    setEmployees(store, employees) {
        store.commit('SET_EMPLOYEES', employees);
    }
  },
  plugins: [vuexLocal.plugin]
});
