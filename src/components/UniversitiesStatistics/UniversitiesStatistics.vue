<template>
  <div>
    <div>
      <div class="uni-full-name">
        <transition name="uni-full-name-fade">
          <div v-if="shown">
            {{ universityInfo.name }}
          </div>
        </transition>
      </div>
    </div>
    <div class="d-flex justify-content-center statistics-block">
      <div class="statistics-block-item">
        <div class="d-flex justify-content-center align-items-center statistics-block-item__number">
          <AnimatedInteger :value="_getIntValue(statistics.programs)" />
        </div>
        <div class="statistics-block-item__label">{{ $t("slider_programs") }}</div>
      </div>
      <div class="statistics-block-item">
        <div class="d-flex justify-content-center align-items-center statistics-block-item__number">
          <AnimatedInteger :value="_getIntValue(statistics.foreign_programs)" />
        </div>
        <div class="statistics-block-item__label">{{ $t("slider_foreign_programs") }}</div>
      </div>
      <div class="statistics-block-item">
        <div class="d-flex justify-content-center align-items-center statistics-block-item__number">
          <AnimatedInteger :value="_getIntValue(statistics.students)" />
        </div>
        <div class="statistics-block-item__label">{{ $t("slider_students") }}</div>
      </div>
      <div class="statistics-block-item">
        <div class="d-flex justify-content-center align-items-center statistics-block-item__number">
          <AnimatedInteger :value="_getIntValue(statistics.foreign_students)" />
        </div>
        <div class="statistics-block-item__label">{{ $t("slider_foreign_students") }}</div>
      </div>
      <div class="statistics-block-item">
        <div class="d-flex justify-content-center align-items-center statistics-block-item__number">
          <AnimatedInteger :value="_getIntValue(statistics.staff)" />
        </div>
        <div class="statistics-block-item__label">{{ $t("slider_staff") }}</div>
      </div>
      <div class="statistics-block-item">
        <div class="d-flex justify-content-center align-items-center statistics-block-item__number">
          <AnimatedInteger :value="_getIntValue(statistics.laboratories)" />
        </div>
        <div class="statistics-block-item__label">{{ $t("slider_laboratories") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedInteger from "./AnimatedInteger.vue";
import { TRANSITION_DURATION } from "../../constants";

export default {
  name: "UniversitiesStatistics",
  components: {
    AnimatedInteger,
  },
  props: {
    universityInfo: Object,
  },

  methods: {
    _getIntValue(value) {
      if (typeof value === "undefined") return 0;
      return Number(value);
    },
  },

  data() {
    return {
      shown: true,
    };
  },

  computed: {
    statistics() {
      return this.universityInfo.statistics ? this.universityInfo.statistics : {};
    },
  },

  watch: {
    universityInfo() {
      this.shown = false;
      setTimeout(() => {
        this.shown = true;
      }, TRANSITION_DURATION);
    },
  },
};
</script>

<style scoped lang="scss">
.statistics-block {
  margin: 10px 0;
}

.statistics-block-item {
  background-color: #fff;
  border-radius: 8px;
  width: 160px;
  height: 160px;
  margin: 0 8px;

  &__number {
    margin-top: 20px;
    width: 100%;
    height: 60px;

    font: 48px/24px OfficinaSansExtraBoldC;
    letter-spacing: 0px;
    color: #087eca;
  }

  &__label {
    margin-top: 20px;
    font: 20px/24px OfficinaSansC;
    text-align: center;
    letter-spacing: 0px;
    color: #000000de;
  }
}

.uni-full-name {
  text-align: center;
  font: normal normal normal 24px/24px OfficinaSansMediumC;
  letter-spacing: 0px;
  color: #000000de;

  &-fade-enter-active,
  &-fade-leave-active {
    transition: all 0.3s;
  }

  &-fade-enter {
    transform: translateY(-36px);
    opacity: 0;
  }

  &-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
