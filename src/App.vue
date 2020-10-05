<template>
  <div id="app">
    <div>
      <Map :universities="universities" :selectedUniversity="shownUniversity" @university-changed="showUniversityOnSlider" />
    </div>
    <div>
      <UniversitiesSlider :sliderData="sliderData" :selectedUniversity="selectedUniversity" @university-changed="showUniveristyOnMap" />
    </div>
    <div class="statistics">
      <UniversitiesStatistics :fullName="shownUniversityName" />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map/Map.vue";
import UniversitiesSlider from "./components/UniversitiesSlider/UniversitiesSlider.vue";
import UniversitiesStatistics from "./components/UniversitiesStatistics/UniversitiesStatistics.vue";

const data = [
  {
    location: { latitude: 59.924739, longitude: 30.380228 },
    city: "SAINT-PETERBURG",
    universities: [
      { id: "idspe1", name: "Университет ИТМО", bgImageUrl: "/bundles/app/css/img/university/logo/itmo.png" },
      { id: "idspe2", name: "СПбПУ", bgImageUrl: "/bundles/app/css/img/university/logo/spbpu.jpg" },
      { id: "idspe3", name: "НИУ ВШЭ в Санкт-Петербурге", bgImageUrl: "/bundles/app/css/img/university/logo/hse.jpg" },
      { id: "idspe4", name: "СПбГЭТУ «ЛЭТИ»", bgImageUrl: "/bundles/app/css/img/university/logo/leti.jpg" },
    ],
  },
  {
    location: { latitude: 53.2120118, longitude: 50.1753568 },
    city: "SAMARA",
    universities: [{ id: "idsam1", name: "Самарский университет", bgImageUrl: "/bundles/app/css/img/university/logo/samu.jpg" }],
  },
  {
    location: { latitude: 56.9219608, longitude: 84.950256 },
    city: "TOMSK",
    universities: [
      { id: "idtom1", name: "ТПУ", bgImageUrl: "/bundles/app/css/img/university/logo/tpu.jpg" },
      { id: "idtom2", name: "ТГУ", bgImageUrl: "/bundles/app/css/img/university/logo/tsu.jpg" },
    ],
  },
  {
    location: { latitude: 57.1590108, longitude: 65.5279635 },
    city: "TYUMEN",
    universities: [
      {
        id: "idtyu1",
        name: "ФГАОУ ВО «Тюменский государственный университет»",
        bgImageUrl: "/bundles/app/css/img/university/logo/ut.jpg",
      },
    ],
  },
  {
    location: { latitude: 56.8403246, longitude: 60.6138365 },
    city: "EKATERINBURG",
    universities: [{ id: "idsve1", name: "УрФУ", bgImageUrl: "/bundles/app/css/img/university/logo/urfu.jpg" }],
  },
  {
    location: { latitude: 55.7614635, longitude: 37.6309452 },
    city: "MOSCOW",
    universities: [
      { id: "idmow1", name: "НИУ ВШЭ", bgImageUrl: "/bundles/app/css/img/university/logo/hse.jpg" },
      { id: "idmow2", name: "РУДН", bgImageUrl: "/bundles/app/css/img/university/logo/rudn.jpg" },
      { id: "idmow3", name: "МИСиС", bgImageUrl: "/bundles/app/css/img/university/logo/misis.jpg" },
      { id: "idmow4", name: "Сеченовский университет", bgImageUrl: "/bundles/app/css/img/university/logo/msmu.jpg" },
      { id: "idmow5", name: "НИЯУ МИФИ", bgImageUrl: "/bundles/app/css/img/university/logo/mifi.jpg" },
      { id: "idmow6", name: "МФТИ", bgImageUrl: "/bundles/app/css/img/university/logo/mipt.png" },
    ],
  },
  {
    location: { latitude: 56.3299584, longitude: 43.9201353 },
    city: "NIZNOVGOROD",
    universities: [
      { id: "idniz1", name: "НИУ ВШЭ", bgImageUrl: "/bundles/app/css/img/university/logo/hse.jpg" },
      { id: "idniz2", name: "УНН", bgImageUrl: "/bundles/app/css/img/university/logo/unn.jpg" },
    ],
  },
  {
    location: { latitude: 58.010727, longitude: 56.2798073 },
    city: "PERM",
    universities: [{ id: "idper1", name: "НИУ ВШЭ", bgImageUrl: "/bundles/app/css/img/university/logo/hse.jpg" }],
  },
  {
    location: { latitude: 55.1604494, longitude: 61.3679071 },
    city: "Chelyabinsk",
    universities: [{ id: "idche1", name: "ЮУРГУ", bgImageUrl: "/bundles/app/css/img/university/logo/susu.jpg" }],
  },
  {
    location: { latitude: 55.1367954, longitude: 60.2646142 },
    city: "ZLATOUS",
    universities: [{ id: "idche2", name: "ФИЛИАЛ ЮУРГУ (НИУ)", bgImageUrl: "/bundles/app/css/img/university/logo/susu.jpg" }],
  },
  {
    location: { latitude: 55.143134, longitude: 60.1484693 },
    city: "MIASS",
    universities: [{ id: "idche3", name: "ФИЛИАЛ ЮУРГУ (НИУ)", bgImageUrl: "/bundles/app/css/img/university/logo/susu.jpg" }],
  },
  {
    location: { latitude: 54.8453476, longitude: 83.0904755 },
    city: "NOVOSIBIRSK",
    universities: [
      { id: "idnvs1", name: "НГУ", bgImageUrl: "/bundles/app/css/img/university/logo/nsu.jpg" },
      { id: "idnvs2", name: "НЮИ", bgImageUrl: "/bundles/app/css/img/university/logo/tsu.jpg" },
    ],
  },
  {
    location: { latitude: 54.7242934, longitude: 20.5252919 },
    city: "KALININGRAD",
    universities: [
      {
        id: "idkgd1",
        name: "Балтийский федеральный университет имени Иммануила Канта",
        bgImageUrl: "/bundles/app/css/img/university/logo/ikbfu.jpg",
      },
    ],
  },
  {
    location: { latitude: 43.4335161, longitude: 39.9156999 },
    city: "SOCHI",
    universities: [
      {
        id: "idnkda1",
        name: "Сочинский институт Российского универсиета дружбы народов",
        bgImageUrl: "/bundles/app/css/img/university/logo/rudn.jpg",
      },
    ],
  },
  {
    location: { latitude: 55.790447, longitude: 49.1192462 },
    city: "KAZAN",
    universities: [{ id: "idta1", name: "КФУ", bgImageUrl: "/bundles/app/css/img/university/logo/kfu.jpg" }],
  },
  {
    location: { latitude: 43.0244636, longitude: 131.8916229 },
    city: "RUSSKIOSTROV",
    universities: [{ id: "idpri1", name: "ДВФУ", bgImageUrl: "/bundles/app/css/img/university/logo/fefu.jpg" }],
  },
  {
    location: { latitude: 56.0099917, longitude: 92.7690147 },
    city: "KRASNOYARSK",
    universities: [
      {
        id: "idkya1",
        name: "Сибирский федеральный университет",
        bgImageUrl: "/bundles/app/css/img/university/logo/sibfu.jpg",
      },
    ],
  },
  {
    location: { latitude: 60.945878, longitude: 76.5543872 },
    city: "NIZHNEVARTOVSK",
    universities: [{ id: "idkhm1", name: "ЮУрГУ филиал", bgImageUrl: "/bundles/app/css/img/university/logo/susu.jpg" }],
  },
];

export default {
  name: "App",
  components: {
    Map,
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
      shownUniversityName: "",
    };
  },
  methods: {
    showUniversityOnSlider(id) {
      this.shownUniversityName = this.universitiesStatistics[id].name;
      this.selectedUniversity = id;
    },
    showUniveristyOnMap(id) {
      this.shownUniversityName = this.universitiesStatistics[id].name;
      this.shownUniversity = id;
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "ru" ? "en" : "ru";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

body {
  background: #f6f8fb;
}

.statistics {
  margin-top: 40px;
}
</style>
