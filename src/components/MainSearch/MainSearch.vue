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
        <!-- &#x1f50d -->
        <div class="flex-grow-1">
          <b-form-input
            id="input-default"
            placeholder="Enter your name"
            class="h-100 border-right-0 border-primary"
          ></b-form-input>
        </div>
        <b-dropdown split split-class="rounded-0 w-100" split-variant="outline-primary" variant="primary" class="h-100">
          <template v-slot:button-content>
            <div class="dropdown-text">
              <span>{{ dropDownSelected }}</span>
            </div>
          </template>

          <b-dropdown-item v-for="(d, i) in dropDownItems" :key="'index' + i" @click="handleSelectedChanged(d)">
            {{ d }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <b-button variant="primary">{{ $t("search") }}</b-button>
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
      dropDownItems: ["action", "Another action", "Something else here dasasd asadsasd..."],
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

      .dropdown {
        width: 220px;
        max-width: 220px;

        .dropdown-text {
          max-width: 100%;
          overflow: hidden;
          font: 16px/24px OfficinaSansC;
          color: #373a3c;

          span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }

    button {
      height: 100%;
      margin-left: 10px;
      padding: 0 50px;
      font: 16px/24px OfficinaSansBoldC;
      color: #ffffff;
    }
  }
}
</style>
