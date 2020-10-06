<template>
  <div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="slider-controls left" @click="previous"></div>
      <transition-group class="d-flex justify-content-center aling-items-end slider" name="uni-list" tag="div">
        <div
          class="d-flex flex-column align-items-center justify-content-center uni-list-item"
          v-for="(uni, i) in data"
          :key="uni.id"
          :id="uni.id"
          :class="{
            margined: isEven && i === data.length - 1,
            centered: Math.floor(data.length / 2) === i,
          }"
          @click="_gotToUniversity(uni.id, i)"
        >
          <UniversitiesSliderItem :name="uni.name" :isActive="Math.floor(data.length / 2) === i" :bgImage="uni.bgImageUrl" />
        </div>
      </transition-group>
      <div class="slider-controls right" @click="next"></div>
    </div>
    <div class="slider-active-bottom"></div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import UniversitiesSliderItem from "./UniversitiesSliderItem";
import { TRANSITION_DURATION } from "../../constants";

export default {
  name: "UniversitiesSlider",
  components: {
    UniversitiesSliderItem,
  },
  props: {
    sliderData: Array,
    selectedUniversity: String,
  },
  data() {
    return {
      data: this.sliderData,
      isMoving: false,
    };
  },
  methods: {
    next() {
      if (this._blockMove()) {
        const removed = this.data.splice(0, 1)[0];
        requestAnimationFrame(() => {
          this.data.push(removed);
          this._changeUniversity();
        });
      }
    },

    previous() {
      if (this._blockMove()) {
        const removed = this.data.splice(this.data.length - 1, 1)[0];
        requestAnimationFrame(() => {
          this.data.unshift(removed);
          this._changeUniversity();
        });
      }
    },

    _blockMove() {
      if (this.isMoving) return false;

      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 2 * TRANSITION_DURATION);

      return true;
    },

    _gotToUniversity(id, index) {
      if (this._blockMove()) {
        const count = index - Math.floor(this.data.length / 2);
        const toPut = [];

        for (let i = 0; i < Math.abs(count); i++) toPut.push(count > 0 ? this.data.shift() : this.data.pop());

        requestAnimationFrame(() => {
          this.data = count > 0 ? this.data.concat(toPut) : toPut.concat(this.data);
          this._changeUniversity();
        });
      }
    },

    _changeUniversity() {
      const { id } = this.data[Math.floor(this.data.length / 2)];
      this.$emit("university-changed", id);
    },
  },

  mounted() {
    this.$nextTick(() => {
      this._changeUniversity();
    });
  },

  computed: {
    isEven() {
      return this.sliderData && this.sliderData.length % 2 === 0;
    },
  },

  watch: {
    selectedUniversity(id) {
      const index = this.data.findIndex((uni) => uni.id === id);
      if (index >= 0) {
        this._gotToUniversity(id, index);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.slider {
  overflow: hidden;
  width: 80vw;
  max-width: 800px;
  height: 160px;
  border-bottom: 2px solid #087eca;

  &-active-bottom {
    position: relative;

    &::before {
      content: " ";
      width: 120px;
      height: 22px;
      background: url("/img/carousel-active-bottom.svg");
      position: absolute;
      left: 0;
      right: 0;
      top: -2px;
      margin: auto;
    }
  }

  &-controls {
    margin: 20px 10px 10px 10px;
    width: 48px;
    min-width: 48px;
    height: 36px;
    cursor: pointer;

    &.left {
      margin-right: 40px;
      background-image: url("/img/slider-left-control.svg");
    }

    &.right {
      margin-left: 40px;
      background-image: url("/img/slider-right-control.svg");
    }
  }
}

.uni-list {
  &-item {
    min-width: 80px;
    margin: 0 2.5px;
    transition: all 0.6s;

    &.centered {
      min-width: 120px;
    }

    &.margined {
      margin-right: 94px;
    }
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
