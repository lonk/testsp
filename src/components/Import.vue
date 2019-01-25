<template>
  <div class="sp-input">
    <div
      class="sp-droparea"
      @dragover.prevent="displaySave = true"
      @dragleave="displaySave = false"
      @drop="onDrop"
    >
      <template v-if="displaySave">
        Veuillez lâcher le fichier .csv
      </template>
      <template v-else>
        Veuillez glisser un fichier .csv dans cette zone
      </template>
    </div>
    <button class="sp-add">
      <i class="material-icons">attach_file</i>
      <input type="file" accept=".csv" @input="inputFile" />
    </button>
  </div>
</template>

<script>
import neatCsv from "neat-csv";
import { mapActions } from "vuex";

const csvHeaders = ["first_name", "last_name", "gender", "mail", "phone"];

export default {
  name: "Import",

  data() {
    return {
      displaySave: false
    };
  },

  methods: {
    ...mapActions(["setEmployees"]),

    onDrop(event) {
      event.stopPropagation();
      event.preventDefault();
      this.displaySave = false;
      this.parseCsv(event.dataTransfer.files[0]);
    },

    inputFile(event) {
      this.parseCsv(event.target.files[0]);
    },

    parseCsv(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", async () => {
        try {
          const result = reader.result.split(",");
          if (result[0] !== "data:text/csv;base64") {
            throw new Error("Le fichier n'est pas un fichier csv");
          }

          const csv = atob(result[1]);
          const parsedCsv = await neatCsv(csv, csvHeaders);

          if (parsedCsv.length === 0) {
            throw new Error("Le fichier est vide");
          }

          window.alert("Le fichier a bien été importé");
          this.setEmployees(parsedCsv);
        } catch (err) {
          window.alert(err);
        }
      });
    }
  }
};
</script>

<style scoped>
.sp-input {
  height: 200px;
  padding-top: 15px;
}

.sp-droparea {
  width: 300px;
  height: 130px;
  border: 2px dashed #dae0e4;
  border-radius: 10px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.sp-add {
  position: relative;
  top: -35px;
  left: 155px;
  width: 50px;
  height: 50px;
  background: #b7b7b7;
  border-radius: 50px;
  border: 0;
  color: #ffffff;
}

.sp-add > input[type="file"] {
  cursor: pointer;
  height: 100%;
  right: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 4;
}
</style>
