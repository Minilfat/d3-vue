<template>
  <div class="main-search-wrapper">
    <div class="main-search-info d-flex">
      <div class="image">
        <img src="/img/gu_art_student.svg" alt="student" />
      </div>
      <div class="info d-flex flex-column justify-content-center">
        <div class="header">{{ $t("main_text") }}</div>
        <div class="text">
          <a href="#"> {{ $t("main_sub_title_link") }}</a> {{ $t("main_sub_title") }}
        </div>
      </div>
    </div>
    <div class="main-search-input-wrapper d-flex">
      <div class="input flex-grow-1 d-flex">
        <div class="flex-grow-1">
          <b-input-group class="h-100">
            <b-input-group-prepend>
              <span class="input-group-text bg-white border-primary">
                <img src="/img/search.svg" alt="s" />
              </span>
            </b-input-group-prepend>
            <b-form-input
              class="h-100 border-right-0 border-left-0 border-primary shadow-none"
              :placeholder="$t('search.keyword')"
            >
            </b-form-input>
          </b-input-group>
        </div>
        <b-dropdown
          split
          split-class="rounded-0 w-100 bg-white shadow-none"
          split-variant="outline-primary"
          variant="primary"
          class="h-100"
        >
          <template v-slot:button-content>
            <div class="dropdown-text">
              <span>{{ $t(dropDownSelected) }}</span>
            </div>
          </template>

          <b-dropdown-item v-for="(d, i) in dropDownItems" :key="'index' + i" @click="handleSelectedChanged(d)">
            {{ $t(d) }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <b-button variant="primary" class="shadow-none">{{ $t("search") }}</b-button>
    </div>
    <div class="main-search-helpers"></div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenuList",
  props: {},
  data() {
    return {
      dropDownItems: ["search.projects", "search.programs", "search.mobility"],
      dropDownSelected: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.dropDownSelected = this.dropDownItems[0];
    });
  },

  methods: {
    handleSelectedChanged(d) {
      this.dropDownSelected = d;
    },
  },
};
</script>

<style scoped lang="scss">
.main-search {
  &-wrapper {
    margin: auto;
    width: 900px;

    height: 100%;
  }

  &-info {
    width: 100%;

    .image {
      height: 180px;
      width: 160px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      max-width: calc(100% - 160px);
      .header {
        height: 40px;
        text-align: center;
        font: 32px/24px OfficinaSansMediumC;
        color: #000000;
      }

      .text {
        text-align: center;
        font: 16px/24px OfficinaSansC;
        color: #000000;

        a {
          color: #000000;
          text-decoration: underline;
        }
      }
    }
  }

  &-input-wrapper {
    height: 38px;

    .input {
      height: 100%;

      input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .dropdown-text {
        font: 16px/24px OfficinaSansC;
        color: #373a3c;
      }
    }

    button {
      height: 100%;
      margin-left: 10px;
      padding: 0 50px;
      font: 16px/24px OfficinaSansBoldC;
      color: var(--white);
    }
  }
}
</style>
