<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "./styles/color-scheme.scss";

@import "~bootstrap/scss/bootstrap";
@import "~bootstrap-vue/src/index.scss";

body {
  margin: 0;
  background: #f6f8fb;
}
</style>
