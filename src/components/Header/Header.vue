<template>
  <div class="d-flex header-wrapper">
    <div class="header-item header-logo"></div>
    <div class="header-item header-lists"></div>
    <div class="header-item header-account"></div>
    <div class="header-item header-int"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header-wrapper {
  margin: 10px;
}

.header-item {
  width: 100px;
  height: 100px;
  background-color: pink;
}
</style>
