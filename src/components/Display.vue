<template>
  <div class="sp-display">
    <div class="sp-employee sp-employee__title">
      <span class="sp-employee__row">Prénom</span>
      <span class="sp-employee__row">Nom</span>
      <span class="sp-employee__row">Genre</span>
      <span class="sp-employee__row">Mail</span>
      <span class="sp-employee__row">Téléphone</span>
      <span class="sp-employee__actions">Action</span>
    </div>
    <div class="sp-employees">
      <div
        class="sp-employee"
        v-for="employee in displayedEmployees"
        :key="employee.index"
      >
        <template v-if="modifiedEmployee.index === employee.index">
          <form @submit.prevent="validateEdition(modifiedEmployee)">
            <span class="sp-employee__row"
              ><input type="text" v-model="modifiedEmployee.first_name"
            /></span>
            <span class="sp-employee__row"
              ><input type="text" v-model="modifiedEmployee.last_name"
            /></span>
            <span class="sp-employee__row"
              ><input type="text" v-model="modifiedEmployee.gender"
            /></span>
            <span class="sp-employee__row"
              ><input type="text" v-model="modifiedEmployee.mail"
            /></span>
            <span class="sp-employee__row"
              ><input type="text" v-model="modifiedEmployee.phone"
            /></span>
            <span class="sp-employee__actions">
              <button type="submit">
                <i class="material-icons">done</i>
              </button>
              <i class="material-icons" @click="clearEmployee()">clear</i>
            </span>
          </form>
        </template>
        <template v-else>
          <span class="sp-employee__row">{{ employee.first_name }}</span>
          <span class="sp-employee__row">{{ employee.last_name }}</span>
          <span class="sp-employee__row">{{ employee.gender }}</span>
          <span class="sp-employee__row">{{ employee.mail }}</span>
          <span class="sp-employee__row">{{ employee.phone }}</span>
          <span class="sp-employee__actions">
            <i class="material-icons" @click="editItem(employee)">edit</i>
            <i class="material-icons" @click="removeItem(employee)"
              >delete_forever</i
            >
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Display",

  data() {
    return {
      modifiedEmployee: {}
    };
  },

  methods: {
    ...mapActions(["editEmployee", "deleteEmployee"]),

    editItem(employee) {
      this.modifiedEmployee = JSON.parse(JSON.stringify(employee));
    },

    removeItem(employee) {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
        this.deleteEmployee(employee);
      }
    },

    validateEdition(employee) {
      this.editEmployee(employee);
      this.clearEmployee();
    },

    clearEmployee() {
      this.modifiedEmployee = {};
    }
  },

  computed: {
    ...mapState({
      employees: state => state.employees
    }),

    displayedEmployees() {
      return this.employees.map((employee, index) => ({
        ...employee,
        index
      }));
    }
  }
};
</script>

<style scoped>
.sp-display {
  height: calc(100% - 268px);
  min-width: 800px;
  max-width: 1000px;
  margin: auto;
  border-left: 1px solid #dce1e5;
  border-right: 1px solid #dce1e5;
}

.sp-employees {
  overflow-y: overlay;
  height: 100%;
  width: 100%;
  color: #25292d;
}

.sp-employee__title {
  font-weight: bold;
  border-bottom: 2px solid #dce1e5 !important;
}

.sp-employee {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-top: 1px solid #dce1e5;
}

.sp-employee > form {
  display: flex;
}

.sp-employee__row {
  flex: 1;
  text-align: left;
  padding: 5px;
}

.sp-employee__actions {
  max-width: 100px !important;
}

.sp-employee__row > input {
  width: 100%;
  border: none;
  font-size: 16px;
}

.sp-employee__actions > i,
.sp-employee__actions > button {
  margin-left: 2px;
  margin-right: 2px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0 !important;
}
</style>
