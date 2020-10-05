<template>
  <div class="d-flex header-wrapper">
    <div class="header-item header-logo d-flex justify-content-center align-items-center"><img :src="getLogoUrl()" alt="logo" /></div>
    <div class="header-item flex-grow-1">
      <HeaderMenuItem />
    </div>
    <div class="header-item header-account d-flex align-items-center">
      <img src="/img/login.svg" alt="login" />
      <div class="login-label">
        {{ $t("login") }}
      </div>
    </div>
    <div class="header-item header-intl d-flex justify-content-center align-items-center" @click="changeLocale()">
      <img :src="getiIntlUrl()" alt="intl" />
    </div>
  </div>
</template>

<script>
import HeaderMenuItem from "./HeaderMenuItem";

export default {
  name: "Header",
  components: {
    HeaderMenuItem,
  },
  methods: {
    getLogoUrl() {
      return `/img/logo-${this.$i18n.locale}.svg`;
    },
    getiIntlUrl() {
      return `/img/intl-${this.$i18n.locale}.svg`;
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "ru" ? "en" : "ru";
    },
  },
};
</script>

<style scoped lang="scss">
@mixin cutLeftTopCorner($size, $colorBody, $colorBg) {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  border-top: $size solid $colorBody;
  border-right: $size solid $colorBg;
}

@mixin cutRightBottomCorner($size, $colorBody, $colorBg) {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;

  border-bottom: $size solid $colorBody;
  border-left: $size solid $colorBg;
}

.header {
  &-wrapper {
    margin: 10px;
  }

  &-item {
    margin: 0 5px;
  }

  &-logo {
    position: relative;
    width: 350px;
    height: 120px;
    background-color: #0284c5;

    &::before {
      @include cutLeftTopCorner(40px, #f6f8fb, #0284c5);
    }

    &::after {
      @include cutRightBottomCorner(40px, #f6f8fb, #0284c5);
    }

    img {
      width: 310px;
      height: 80px;
    }
  }

  &-account {
    position: relative;
    cursor: pointer;
    height: 40px;
    min-width: 90px;
    background-color: #0063a4;

    ::before {
      @include cutLeftTopCorner(15px, #f6f8fb, #0063a4);
    }

    &::after {
      @include cutRightBottomCorner(15px, #f6f8fb, #0063a4);
    }

    img {
      margin-left: 10px;
      margin-right: 5px;
      width: 24px;
      height: 24px;
    }

    .login-label {
      margin-right: 16px;
      text-align: left;
      font: 18px/24px OfficinaSansC;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

  &-intl {
    position: relative;
    cursor: pointer;
    height: 40px;
    min-width: 90px;
    background-color: #0284c5;

    img {
      width: 50px;
      height: 25px;
    }

    &::before {
      @include cutLeftTopCorner(15px, #f6f8fb, #0284c5);
    }

    &::after {
      @include cutRightBottomCorner(15px, #f6f8fb, #0284c5);
    }
  }
}
</style>
