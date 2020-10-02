<template>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="uni in data" :key="uni.id" class="slide">
        <h4>{{ uni.id }}</h4>
        <UniversitiesSliderItem :isActive="false" bgImage="https://cdn0.iconfinder.com/data/icons/flat-round-system/512/android-128.png" />
      </div>
    </transition-group>

    <div class="carousel-controls">
      <button class="carousel-controls__button" @click="previous">prev</button>
      <button class="carousel-controls__button" @click="next">next</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import UniversitiesSliderItem from "./UniversitiesSliderItem";

export default {
  name: "UniversitiesSlider",
  components: {
    UniversitiesSliderItem
  },
  props: {
    sliderData: Array
  },
  data() {
    return {
      data: this.sliderData
    };
  },
  methods: {
    next() {
      const first = this.data.shift();
      this.data = this.data.concat(first);
    },
    previous() {
      const last = this.data.pop();
      this.data = [last].concat(this.data);
    }
  },

  mounted() {
    // this.loadData();
  },

  computed: {
    // sliderData() {
    //   return ;
    // }
  }
};
</script>

<style>
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 80vw;
  max-width: 900px;
}

.slide {
  flex: 0 0 20em;
  height: 20em;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em dashed #000;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}
</style>
