<template>
  <div id="app">
    <Import />
    <Display />
  </div>
</template>

<script>
import Import from "./components/Import.vue";
import Display from "./components/Display.vue";

export default {
  name: "app",
  components: {
    Import,
    Display
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
