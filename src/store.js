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
    },

    EDIT_EMPLOYEE(state, payload) {
        state.employees.splice(payload.index, 1, payload);
    },

    DELETE_EMPLOYEE(state, payload) {
        state.employees.splice(payload.index, 1);
    }
  },
  actions: {
    setEmployees(store, employees) {
        store.commit('SET_EMPLOYEES', employees);
    },

    editEmployee(store, payload) {
        store.commit('EDIT_EMPLOYEE', payload);
    },

    deleteEmployee(store, payload) {
        store.commit('DELETE_EMPLOYEE', payload);
    }
  },
  plugins: [vuexLocal.plugin]
});
