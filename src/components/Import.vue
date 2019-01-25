<template>
  <div class="sp-input">
    <input type="file" accept=".csv" @input="inputFile" />
  </div>
</template>

<script>
import neatCsv from "neat-csv";
import { mapActions } from "vuex";

const csvHeaders = ["first_name", "last_name", "gender", "mail", "phone"];

export default {
  name: "Import",
  methods: {
    ...mapActions(["setEmployees"]),

    inputFile(event) {
      this.parseCsv(event.target.files[0]);
    },

    parseCsv(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", async () => {
        try {
          const csv = atob(reader.result.split(",")[1]);
          const parsedCsv = await neatCsv(csv, csvHeaders);

          this.setEmployees(parsedCsv);
        } catch (err) {
          window.alert("Le fichier CSV est corrompu");
        }
      });
    }
  }
};
</script>

<style scoped>
.sp-input {
  height: 100px;
}
</style>
