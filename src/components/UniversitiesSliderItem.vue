// UniversitiesSliderItem
<template>
  <div class="circle">
    <img :src="bgImage" alt="uni" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: "UniversitiesSliderItem",
  props: {
    isActvie: Boolean,
    bgImage: String
  },
  data() {
    return {};
  },
  methods: {},

  mounted() {
    // this.loadData();
  }
};
</script>

<style scoped>
.circle {
  width: 80px;
  height: 80px;
}

.circle img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
