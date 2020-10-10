<template>
  <div class="w-100">
    <div v-if="loadingSliderData">
      <div class="d-flex justify-content-center align-items-center carousel-wrapper">
        <b-spinner variant="primary"></b-spinner>
      </div>
    </div>
    <transition name="carousel-fade">
      <div
        v-if="sliderDataLoaded && !loadingSliderData"
        class="d-flex justify-content-center align-items-center carousel-wrapper"
      >
        <div class="carousel-controls left" @click="previous"></div>
        <transition-group name="slider" tag="div" class="carousel-content d-flex justify-content-center">
          <div class="carousel-content-item" v-for="data in slides" :key="data.id">
            <div class="background-image">
              <img :src="data.bgImageSrc" alt="img" />
            </div>
            <div class="info">
              <div class="wrapper d-flex flex-column justify-content-between align-items-center">
                <div><img :src="data.logoImageSrc" alt="desc" /></div>
                <div class="text">
                  {{ data[`text_${$i18n.locale}`] }}
                </div>
                <div>
                  <b-button variant="primary" :href="data.link"> {{ $t("carousel.learn") }}</b-button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="carousel-controls right" @click="next"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { GET_SLIDER_DATA } from "../../store/actions";

export default {
  name: "Carousel",
  data() {
    return {
      slides: [],
      sliderDataLoaded: false,
    };
  },

  computed: {
    ...mapGetters(["loadingSliderData", "sliderData"]),
  },

  methods: {
    ...mapActions([GET_SLIDER_DATA]),

    next() {
      const removed = this.slides.splice(0, 1)[0];
      requestAnimationFrame(() => {
        this.slides.push(removed);
      });
    },
    previous() {
      const removed = this.slides.splice(this.slides.length - 1, 1)[0];
      requestAnimationFrame(() => {
        this.slides.unshift(removed);
      });
    },
  },

  mounted() {
    if (this.sliderData && this.sliderData.length > 0) {
      this.slides = this.sliderData;
      this.sliderDataLoaded = true;
      return;
    }
    this[GET_SLIDER_DATA]();
  },

  watch: {
    sliderData(value) {
      if (value && value.length > 0) {
        this.slides = value;
        this.sliderDataLoaded = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.carousel {
  &-fade {
    &-enter-active,
    &-leave-active {
      transition: all 1s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  &-wrapper {
    height: 450px;
    margin: 20px auto;
  }

  &-controls {
    width: 48px;
    min-width: 48px;
    height: 36px;
    cursor: pointer;

    &.left {
      margin-right: 20px;
      background-image: url("/img/slider-left-control.svg");
    }

    &.right {
      margin-left: 20px;
      background-image: url("/img/slider-right-control.svg");
    }
  }

  &-content {
    width: 900px;
    height: 450px;
    overflow: hidden;

    &-item {
      // width: 875px;
      min-width: calc(100% - 25px);
      height: 450px;
      position: relative;

      background-color: var(--brand);
      -webkit-clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);
      clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);

      transition: all 0.6s;

      &:first-of-type {
        opacity: 0;
      }
      &:last-of-type {
        opacity: 0;
      }

      .background-image {
        width: calc(100% - 8px);
        height: 442px;

        -webkit-clip-path: polygon(38px 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%, 0 38px);
        clip-path: polygon(38px 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%, 0 38px);

        display: block;
        position: absolute;
        top: 4px;
        left: 4px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 35%;
        @media screen and (max-width: 500px) {
          width: 100%;
        }

        height: calc(100% - 8px);
        -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%);
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 38px), calc(100% - 38px) 100%, 0 100%);
        background: linear-gradient(0.25turn, transparent, 20%, rgba(0, 0, 0, 0.5));

        .wrapper {
          height: 100%;
          padding: 30px 40px 60px;

          .text {
            font: 14px/16px OfficinaSansMediumC;
            color: var(--white);
          }

          button {
            font: 16px/24px OfficinaSansBoldC;
            color: var(--white);
          }
        }
      }
    }
  }
}
</style>
