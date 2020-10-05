<template>
  <div class="d-flex flex-column align-items-center">
    <div class="circle" :class="{ active: isActive }">
      <img :src="bgImage" alt="uni" />
    </div>

    <transition name="fade">
      <div class="label" v-if="!isActive">
        {{ name }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UniversitiesSliderItem",
  props: {
    isActive: Boolean,
    bgImage: String,
    name: String,
  },
};
</script>

<style scoped lang="scss">
.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 5px;

  &.active {
    width: 120px;
    height: 120px;
    background-color: #ffffff;
    border: 4px solid #e61973;
    transition: all 0.5s ease-in;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.label {
  height: 23px;
  overflow-y: hidden;
  text-align: center;
  font: normal normal normal 14px/24px OfficinaSansMediumC;
  letter-spacing: 0px;
  color: #000000de;
}

.fade-leave {
  &-active {
    transition: all 0.49s ease-out;
    height: 23px;
  }

  &-to {
    opacity: 0;
    height: 0px;
  }
}
</style>
