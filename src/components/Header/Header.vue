<template>
  <div class="d-flex header-wrapper">
    <div class="header-item header-logo d-flex justify-content-center align-items-center">
      <img :src="getLogoUrl()" alt="logo" />
    </div>
    <div class="header-item flex-grow-1">
      <div class="header-nav-menu d-flex ml-auto align-items-center">
        <div class="header-nav-menu__item" @click="showMenuList('association')">
          <div class="header-nav-menu__item-label">{{ $t("middle-menu.association") }}</div>
          <div class="header-nav-menu__item-list left">
            <HeaderMenuList
              :isShown="shownMenuList === 'association'"
              :label="$t('middle-menu.association')"
              pointerPosition="left"
            >
              <div class="d-flex">
                <div class="header-list-content">
                  <div class="label">
                    {{ $t("middle-menu.association") }}
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <a href="#"> {{ $t("middle-menu.association-about") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.association-council") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.audit-cometee") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.projects") }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="header-list-content">
                  <div class="label">
                    {{ $t("middle-menu.universities") }}
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <a href="#"> {{ $t("middle-menu.association-members") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.practices") }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </HeaderMenuList>
          </div>
        </div>
        <div class="header-nav-menu__item">
          <div class="header-nav-menu__item-label">{{ $t("middle-menu.news") }}</div>
        </div>
        <div class="header-nav-menu__item" @click="showMenuList('science')">
          <div class="header-nav-menu__item-label">{{ $t("middle-menu.science") }}</div>
          <div class="header-nav-menu__item-list center">
            <HeaderMenuList :isShown="shownMenuList === 'science'" :label="$t('middle-menu.science')" pointerPosition="center">
              <div class="d-flex">
                <div class="header-list-content">
                  <div class="label">
                    {{ $t("middle-menu.contests") }}
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <a href="#"> {{ $t("middle-menu.grants") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.international_contests") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.rd") }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="header-list-content">
                  <div class="label">
                    {{ $t("middle-menu.events") }}
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <a href="#"> {{ $t("middle-menu.conferences") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.postdock") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.seminars") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.other") }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </HeaderMenuList>
          </div>
        </div>
        <div class="header-nav-menu__item" @click="showMenuList('education')">
          <div class="header-nav-menu__item-label">{{ $t("middle-menu.education") }}</div>
          <div class="header-nav-menu__item-list right">
            <HeaderMenuList :isShown="shownMenuList === 'education'" :label="$t('middle-menu.education')" pointerPosition="right">
              <div class="d-flex">
                <div class="header-list-content">
                  <div class="label">
                    {{ $t("middle-menu.programs") }}
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <a href="#"> {{ $t("bachelor") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("n_specialty") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("master") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("postgraduate") }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="header-list-content">
                  <div class="label">
                    {{ $t("middle-menu.events") }}
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <a href="#"> {{ $t("middle-menu.lectures_class") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.internships") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.summerschools") }}</a>
                      </li>
                      <li>
                        <a href="#"> {{ $t("middle-menu.masterclasses") }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </HeaderMenuList>
          </div>
        </div>
      </div>
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
/* eslint-disable no-unused-vars */

import HeaderMenuList from "./HeaderMenuList";

export default {
  name: "Header",
  components: {
    HeaderMenuList,
  },
  data() {
    return {
      shownMenuList: "",
    };
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
    showMenuList(item) {
      this.shownMenuList = this.shownMenuList === item ? "" : item;
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

  &-nav-menu {
    position: relative;
    background-color: #0284c5;
    padding: 0 20px;
    height: 40px;
    width: fit-content;

    &::before {
      @include cutLeftTopCorner(15px, #f6f8fb, #0284c5);
    }

    &::after {
      @include cutRightBottomCorner(15px, #f6f8fb, #0284c5);
    }

    &__item {
      position: relative;
      cursor: pointer;
      border-left: 2px solid #fff;

      &-label {
        padding: 0 20px;
        font: 18px/24px OfficinaSansBookC;
        color: #ffffff;
      }

      &:first-of-type {
        border-left: none;
      }

      &-list {
        position: absolute;
        top: 200%;
        width: 100%;
        z-index: 2;

        // 480px the width of dropdown list
        &.left {
          left: calc(480px * -0.15 + 40%);
        }

        &.center {
          left: calc(480px * -0.45 + 40%);
        }

        &.right {
          left: calc(480px * -0.75 + 40%);
        }
      }
    }
  }

  &-list-content {
    width: 50%;

    .label {
      font: 16px/24px OfficinaSansMediumC;
      color: #7993a6;
      opacity: 1;
      text-transform: uppercase;
    }

    .content {
      margin: 10px;

      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        li {
          margin-bottom: 5px;
          a {
            text-align: left;
            text-decoration: underline;
            font: 16px/24px OfficinaSansMediumC;
            letter-spacing: -0.4px;
            color: #1c7cd5;
          }
        }
      }
    }
  }
}
</style>
