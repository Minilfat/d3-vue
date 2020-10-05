<template>
  <span>
    {{ tweeningValue }}
  </span>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";
import { TRANSITION_DURATION } from "../../constants";

export default {
  name: "AnimatedInteger",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      tweeningValue: 0,
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      if (newValue) {
        this.tween(oldValue ? oldValue : 0, newValue);
      }
    },
  },
  mounted: function () {
    if (this.value) {
      this.tween(0, this.value);
    }
  },
  methods: {
    tween: function (startValue, endValue) {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 2 * TRANSITION_DURATION)
        .onUpdate((object) => {
          this.tweeningValue = object.tweeningValue.toFixed(0);
        })
        .start();

      requestAnimationFrame(animate);
    },
  },
};
</script>
