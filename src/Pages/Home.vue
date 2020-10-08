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
    <div>
      <Map
        :universities="universities"
        :selectedUniversity="shownUniversity"
        @university-changed="showUniversityOnSlider"
      />
    </div>

    <div>
      <UniversitiesSlider
        :sliderData="sliderData"
        :selectedUniversity="selectedUniversity"
        @university-changed="showUniveristyOnMap"
      />
    </div>
    <div class="statistics">
      <UniversitiesStatistics :universityInfo="universityInfo" />
    </div>
    <div class="news-block">
      <News />
    </div>
  </div>
</template>

<script>
import Map from "../components/Map/Map.vue";
import News from "../components/News/News.vue";
import Carousel from "../components/Carousel/Carousel.vue";
import MainSearch from "../components/MainSearch/MainSearch.vue";
import UniversitiesSlider from "../components/UniversitiesSlider/UniversitiesSlider.vue";
import UniversitiesStatistics from "../components/UniversitiesStatistics/UniversitiesStatistics.vue";

import data from "./mapData";

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
      universities: data,
      sliderData: data.reduce((acc, item) => acc.concat(item.universities), []),
      universitiesStatistics: data.reduce((acc, item) => {
        item.universities.forEach((uni) => {
          acc[uni.id] = uni;
        });
        return acc;
      }, {}),
      selectedUniversity: "",
      shownUniversity: "",
      universityInfo: {},
    };
  },
  methods: {
    showUniversityOnSlider(id) {
      this.universityInfo = this.universitiesStatistics[id];
      this.selectedUniversity = id;
    },
    showUniveristyOnMap(id) {
      this.universityInfo = this.universitiesStatistics[id];
      this.shownUniversity = id;
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
</style>
