<template>
  <div class="d-flex header-menu-item">
    <div class="header-menu-item-inner"></div>
    <!-- <div class="header-item header-logo d-flex justify-content-center align-items-center"><img :src="getLogoUrl()" alt="logo" /></div>
    <div class="header-item flex-grow-1"></div>
    <div class="header-item header-account d-flex align-items-center">
      <img src="/img/login.svg" alt="login" />
      <div class="login-label">
        {{ $t("login") }}
      </div>
    </div>
    <div class="header-item header-intl d-flex justify-content-center align-items-center" @click="changeLocale()">
      <img :src="getiIntlUrl()" alt="intl" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "HeaderMenuItem",
};
</script>

<style scoped lang="scss">
.header-menu-item {
  position: relative;
  cursor: pointer;

  width: 200px;
  height: 50px;
  background-color: #f12578;

  -webkit-clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);

  &-inner {
    width: calc(100% - 4px);
    height: 46px;

    -webkit-clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
    clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);

    background-color: #f6f8fb;
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
  }
}
</style>
