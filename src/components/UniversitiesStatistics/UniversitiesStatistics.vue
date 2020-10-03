<template>
  <div class="wrapper">
    <div class="name">
      {{ fullName }}
    </div>

    <!-- <transition name="fade">
      <div class="label" v-if="!isActive">
        {{ name }}
      </div>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: "UniversitiesStatistics",
  props: {
    fullName: String,
    statistics: Object
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  text-align: center;
  font: normal normal normal 24px/24px OfficinaSansMediumC;
  letter-spacing: 0px;
  color: #000000de;
}
</style>
