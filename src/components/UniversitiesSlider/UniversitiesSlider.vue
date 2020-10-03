<template>
  <div>
    <div class="carousel-view">
      <div class="carousel-controls left" @click="previous"></div>
      <transition-group class="carousel" name="uni-list" tag="div" delay="100">
        <div v-for="(uni, i) in data" :key="uni.id" class="uni-list-item" :id="uni.id" @click="_gotToUniversity(uni.id, i)">
          <UniversitiesSliderItem :name="uni.name" :isActive="Math.floor(data.length / 2) === i" :bgImage="uni.bgImageUrl" />
        </div>
      </transition-group>
      <div class="carousel-controls right" @click="next"></div>
    </div>
    <div class="carousel-active-bottom"></div>
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
    sliderData: Array,
    selectedUniversity: String
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
        this._changeUniversity();
      });
    },

    previous() {
      if (this.isMoving) return;
      this._blockMove();

      const removed = this.data.splice(this.data.length - 1, 1)[0];
      requestAnimationFrame(() => {
        this.data.unshift(removed);
        this._changeUniversity();
      });
    },

    _blockMove() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, MOVE_DURATION);
    },

    _gotToUniversity(id, index) {
      if (this.isMoving) return;
      this._blockMove();

      const count = index - Math.floor(this.data.length / 2);
      const toPut = [];

      for (let i = 0; i < Math.abs(count); i++) toPut.push(count > 0 ? this.data.shift() : this.data.pop());

      requestAnimationFrame(() => {
        this.data = count > 0 ? this.data.concat(toPut) : toPut.concat(this.data);
        this._changeUniversity();
      });
    },

    _changeUniversity() {
      const { id } = this.data[Math.floor(this.data.length / 2)];
      this.$emit("university-changed", id);
    }
  },

  mounted() {
    this.$nextTick(() => {
      this._changeUniversity();
    });
  },

  watch: {
    selectedUniversity(id) {
      const index = this.data.findIndex(uni => uni.id === id);
      if (index >= 0) {
        this._gotToUniversity(id, index);
      }
    }
  }
};
</script>

<style scoped>
.carousel-view {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-controls {
  margin: 20px 10px 10px 10px;
  width: 48px;
  min-width: 48px;
  height: 36px;
  cursor: pointer;
}

.carousel-controls.left {
  margin-right: 40px;
  background-image: url("/images/sliderLeftControl.svg");
}

.carousel-controls.right {
  margin-left: 40px;
  background-image: url("/images/sliderRigthControl.svg");
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;

  width: 80vw;
  max-width: 960px;
  height: 160px;
  padding-bottom: 6px;
  border-bottom: 2px solid #087eca;
}

.carousel-active-bottom {
  position: relative;
}

.carousel-active-bottom::before {
  content: " ";
  width: 120px;
  height: 22px;
  background: url("/images/carouselActiveBottom.svg");
  position: absolute;
  left: 0;
  right: 0;
  top: -2px;
  margin: auto;
}

.uni-list-item {
  min-width: 98px;
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
