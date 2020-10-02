<template>
  <div>
    <div class="carousel-view">
      <transition-group class="carousel" name="uni-list" tag="div" delay="100">
        <div v-for="(uni, i) in data" :key="uni.id" class="uni-list-item" :id="uni.id" @click="_handleClick(uni.id, i)">
          <UniversitiesSliderItem :name="uni.id" :isActive="Math.floor(data.length / 2) === i" bgImage="/aa.png" />
        </div>
      </transition-group>
    </div>
    <!-- bgImage="https://cdn0.iconfinder.com/data/icons/flat-round-system/512/android-128.png" -->
    <div class="carousel-controls">
      <button class="carousel-controls__button" @click="previous">prev</button>
      <button class="carousel-controls__button" @click="next">next</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import UniversitiesSliderItem from "./UniversitiesSliderItem";

const MOVE_DURATION = 600;

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
      data: this.sliderData,
      isMoving: false
    };
  },
  methods: {
    next() {
      if (this.isMoving) return;
      this._blockMove();

      const removed = this.data.splice(0, 1)[0];
      requestAnimationFrame(() => {
        this.data.push(removed);
      });
    },

    previous() {
      if (this.isMoving) return;
      this._blockMove();

      const removed = this.data.splice(this.data.length - 1, 1)[0];
      requestAnimationFrame(() => {
        this.data.unshift(removed);
      });
    },

    _blockMove() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, MOVE_DURATION);
    },

    _handleClick(id, index) {
      if (this.isMoving) return;
      this._blockMove();

      const count = index - Math.floor(this.data.length / 2);
      const toPut = [];

      for (let i = 0; i < Math.abs(count); i++) toPut.push(count > 0 ? this.data.shift() : this.data.pop());

      requestAnimationFrame(() => {
        this.data = count > 0 ? this.data.concat(toPut) : toPut.concat(this.data);
      });
    }
  },

  computed: {}
};
</script>

<style scoped>
.carousel-view {
  display: flex;
  justify-content: center;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;

  width: 80vw;
  max-width: 900px;
  height: 160px;
}

.uni-list-item {
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;

  transition: all 0.6s;
}

.uni-list-enter,
.uni-list-leave-to {
  opacity: 0;
}

/* .carousel:nth-of-type(1) {
  flex-basis: calc(50% - 100px);
  justify-content: flex-end;
}

.carousel:nth-of-type(2) {
  width: 100px;
}

.carousel:nth-of-type(3) {
  flex-basis: calc(50% - 100px);
  justify-content: flex-start;
} */
</style>
