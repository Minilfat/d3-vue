<template>
  <transition name="menu-list">
    <div v-if="isShown" class="d-flex flex-column header-menu-list" :data-pointer-position="pointerPosition">
      <!-- @click="(e) => e.stopPropagation()" -->
      <div class="header-menu-list-label d-flex align-items-center">
        <span>{{ label }}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "HeaderMenuList",
  props: {
    label: String,
    isShown: Boolean,
    pointerPosition: String,
  },
};
</script>

<style scoped lang="scss">
.header-menu-list {
  cursor: default;
  width: 480px;
  min-height: 200px;
  height: 100%;
  background: var(--white);
  box-shadow: 0px 10px 20px #0000009c;
  border: 2px solid var(--blue-main);
  border-radius: 4px;

  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    background: url("/img/list-pointer.svg");
    width: 30px;
    height: 20px;
  }

  &[data-pointer-position="left"]::before {
    left: 15%;
  }

  &[data-pointer-position="center"]::before {
    left: 45%;
  }

  &[data-pointer-position="right"]::before {
    left: 75%;
  }

  .content {
    padding: 20px;
  }

  &-label {
    width: 100%;
    height: 32px;
    border: 1px solid var(--white);
    background-color: var(--primary);

    > span {
      display: block;
      margin-left: 14px;

      font: 16px/18px OfficinaSansC;
      color: var(--white);
    }
  }
}

.menu-list-enter-active,
.menu-list-leave-active {
  transition: opacity 0.6s;
}
.menu-list-enter,
.menu-list-leave-to {
  opacity: 0;
}
</style>
