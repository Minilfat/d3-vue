<template>
  <div class="statistics-wrapper">
    <div class="uni-full-name">
      <transition name="uni-full-name-fade">
        <div v-if="shown">
          {{ fullName }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
const TRANSITION_DURATION = 300;

export default {
  name: "UniversitiesStatistics",
  props: {
    fullName: String,
    statistics: Object,
  },

  data() {
    return {
      shown: true,
    };
  },

  watch: {
    fullName(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.shown = false;
        setTimeout(() => {
          this.shown = true;
        }, TRANSITION_DURATION);
      }
    },
  },
};
</script>

<style scoped>
.statistics-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.uni-full-name {
  text-align: center;
  font: normal normal normal 24px/24px OfficinaSansMediumC;
  letter-spacing: 0px;
  color: #000000de;
}

.uni-full-name-fade-enter-active,
.uni-full-name-fade-leave-active {
  transition: all 0.3s;
}

.uni-full-name-fade-enter {
  transform: translateY(-36px);
  opacity: 0;
}

.uni-full-name-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
