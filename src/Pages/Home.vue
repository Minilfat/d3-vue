<template>
  <div>
    <div>
      <Carousel />
    </div>
    <div>
      <MainSearch />
    </div>
    <div class="main-page-universities">
      <div class="label">{{ $t("main.label") }}</div>
    </div>

    <div v-if="loadingMap">
      <div class="text-center map-loading-margin">
        <b-spinner variant="primary"></b-spinner>
      </div>
    </div>
    <transition name="map-fade">
      <div v-if="!loadingMap && mapLoaded">
        <Map
          :universities="universities"
          :selectedUniversity="shownUniversity"
          @university-changed="showUniversityOnSlider"
        />

        <UniversitiesSlider
          :sliderData="sliderData"
          :selectedUniversity="selectedUniversity"
          @university-changed="showUniveristyOnMap"
        />

        <div class="statistics">
          <UniversitiesStatistics :universityInfo="universityInfo" />
        </div>
      </div>
    </transition>

    <div class="news-block">
      <News />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Map from "../components/Map/Map.vue";
import News from "../components/News/News.vue";
import Carousel from "../components/Carousel/Carousel.vue";
import MainSearch from "../components/MainSearch/MainSearch.vue";
import UniversitiesSlider from "../components/UniversitiesSlider/UniversitiesSlider.vue";
import UniversitiesStatistics from "../components/UniversitiesStatistics/UniversitiesStatistics.vue";

import { GET_MAP } from "../store/actions";

export default {
  name: "Home",
  components: {
    Map,
    News,
    Carousel,
    MainSearch,
    UniversitiesSlider,
    UniversitiesStatistics,
  },

  data() {
    return {
      universities: [],
      sliderData: [],
      universitiesStatistics: {},
      selectedUniversity: "",
      shownUniversity: "",
      universityInfo: {},
      mapLoaded: false,
    };
  },
  computed: {
    ...mapGetters(["loadingMap", "mapData"]),
  },

  methods: {
    ...mapActions([GET_MAP]),

    showUniversityOnSlider(id) {
      this.universityInfo = this.universitiesStatistics[id];
      this.selectedUniversity = id;
    },
    showUniveristyOnMap(id) {
      this.universityInfo = this.universitiesStatistics[id];
      this.shownUniversity = id;
    },

    _initMap(value) {
      this.mapLoaded = true;
      this.universities = value;
      this.sliderData = value.reduce((acc, item) => acc.concat(item.universities), []);
      this.universitiesStatistics = value.reduce((acc, item) => {
        item.universities.forEach((uni) => {
          acc[uni.id] = uni;
        });
        return acc;
      }, {});
    },
  },

  mounted() {
    if (this.mapData && this.mapData.length > 0) return this._initMap(this.mapData);
    this[GET_MAP]();
  },

  watch: {
    mapData(value) {
      if (value && value.length > 0) {
        this._initMap(value);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.statistics {
  margin-top: 40px;
}

.main-page-universities {
  width: 100%;
  margin: 60px auto;
  text-align: center;

  .label {
    font: 32px/24px OfficinaSansMediumC;
    color: #000000de;
  }
}

.news-block {
  margin: 60px auto;
}

.map {
  &-loading-margin {
    margin: 15vh 0;
  }

  &-fade {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>
