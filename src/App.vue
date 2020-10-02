<template>
  <div id="app">
    <Map :universities="universities" />

    <div style="padding: 20px 0">
      <UniversitiesSlider :sliderData="sliderData" />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import UniversitiesSlider from "./components/UniversitiesSlider.vue";

const data = [
  {
    location: { latitude: 59.924739, longitude: 30.380228 },
    city: "SAINT-PETERBURG",
    universities: [
      { id: "idspe1", name: "Университет ИТМО", bgImageUrl: "/assets/itmo.png" },
      { id: "idspe2", name: "СПбПУ", bgImageUrl: "/assets/spbpu.png" },
      { id: "idspe3", name: "НИУ ВШЭ в Санкт-Петербурге", bgImageUrl: "/assets/sphse.png" },
      { id: "idspe4", name: "СПбГЭТУ «ЛЭТИ»", bgImage: "/assets/sphse.png" }
    ]
  },
  {
    location: { latitude: 53.2120118, longitude: 50.1753568 },
    city: "SAMARA",
    universities: [{ id: "idsam1", name: "Самарский университет", bgImageUrl: "/assets/samara.png" }]
  },
  {
    location: { latitude: 56.9219608, longitude: 84.950256 },
    city: "TOMSK",
    universities: [
      { id: "idtom1", name: "ТПУ", bgImageUrl: "/assets/tpu.png" },
      { id: "idtom2", name: "ТГУ", bgImageUrl: "/assets/tgu.png" }
    ]
  },
  {
    location: { latitude: 57.1590108, longitude: 65.5279635 },
    city: "TYUMEN",
    universities: [{ id: "idtyu1", name: "ФГАОУ ВО «Тюменский государственный университет»", bgImageUrl: "/assets/tymgu.png" }]
  },
  {
    location: { latitude: 56.8403246, longitude: 60.6138365 },
    city: "EKATERINBURG",
    universities: [{ id: "idsve1", name: "УрФУ", bgImageUrl: "/assets/urfu.png" }]
  },
  {
    location: { latitude: 55.7614635, longitude: 37.6309452 },
    city: "MOSCOW",
    universities: [
      { id: "idmow1", name: "НИУ ВШЭ", bgImageUrl: "/assets/hse.png" },
      { id: "idmow2", name: "РУДН", bgImageUrl: "/assets/urfu.png" },
      { id: "idmow3", name: "МИСиС", bgImageUrl: "/assets/misis.png" },
      { id: "idmow4", name: "Сеченовский университет", bgImageUrl: "/assets/sechenov.png" },
      { id: "idmow5", name: "НИЯУ МИФИ", bgImageUrl: "/assets/mifi.png" },
      { id: "idmow6", name: "МФТИ", bgImageUrl: "/assets/mfti.png" }
    ]
  },
  {
    location: { latitude: 56.3299584, longitude: 43.9201353 },
    city: "NIZNOVGOROD",
    universities: [
      { id: "idniz1", name: "НИУ ВШЭ", bgImageUrl: "/assets/hsenn.png" },
      { id: "idniz2", name: "УНН", bgImageUrl: "/assets/unn.png" }
    ]
  },
  {
    location: { latitude: 58.010727, longitude: 56.2798073 },
    city: "PERM",
    universities: [{ id: "idper1", name: "НИУ ВШЭ", bgImageUrl: "/assets/hseper.png" }]
  },
  {
    location: { latitude: 55.1604494, longitude: 61.3679071 },
    city: "Chelyabinsk",
    universities: [{ id: "idche1", name: "ЮУРГУ", bgImageUrl: "/assets/uyrgu.png" }]
  },
  {
    location: { latitude: 55.1367954, longitude: 60.2646142 },
    city: "ZLATOUS",
    universities: [{ id: "idche2", name: "ФИЛИАЛ ЮУРГУ (НИУ)", bgImageUrl: "/assets/zlatous.png" }]
  },
  {
    location: { latitude: 55.143134, longitude: 60.1484693 },
    city: "MIASS",
    universities: [{ id: "idche3", name: "ФИЛИАЛ ЮУРГУ (НИУ)", bgImageUrl: "/assets/miass.png" }]
  },
  {
    location: { latitude: 54.8453476, longitude: 83.0904755 },
    city: "NOVOSIBIRSK",
    universities: [
      { id: "idnvs1", name: "НГУ", bgImageUrl: "/assets/nsu.png" },
      { id: "idnvs2", name: "НЮИ", bgImageUrl: "/assets/nyu.png" }
    ]
  },
  {
    location: { latitude: 54.7242934, longitude: 20.5252919 },
    city: "KALININGRAD",
    universities: [{ id: "idkgd1", name: "Балтийский федеральный университет имени Иммануила Канта", bgImageUrl: "/assets/bsukanta.png" }]
  },
  {
    location: { latitude: 43.4335161, longitude: 39.9156999 },
    city: "SOCHI",
    universities: [{ id: "idnkda1", name: "Сочинский институт Российского универсиета дружбы народов", bgImageUrl: "/assets/rudnsochi.png" }]
  },
  {
    location: { latitude: 55.790447, longitude: 49.1192462 },
    city: "KAZAN",
    universities: [{ id: "idta1", name: "КФУ", bgImageUrl: "/assets/kfu.png" }]
  },
  {
    location: { latitude: 43.0244636, longitude: 131.8916229 },
    city: "RUSSKIOSTROV",
    universities: [{ id: "idpri1", name: "ДВФУ", bgImageUrl: "/assets/dvfu.png" }]
  },
  {
    location: { latitude: 56.0099917, longitude: 92.7690147 },
    city: "KRASNOYARSK",
    universities: [{ id: "idkya1", name: "Сибирский федеральный университет", bgImageUrl: "/assets/SibFU.png" }]
  },
  {
    location: { latitude: 60.945878, longitude: 76.5543872 },
    city: "NIZHNEVARTOVSK",
    universities: [{ id: "idkhm1", name: "ЮУрГУ филиал", bgImageUrl: "/assets/chel.png" }]
  }
];

export default {
  name: "App",
  components: {
    Map,
    UniversitiesSlider
  },
  data() {
    return {
      universities: data,
      sliderData: data.reduce((acc, item) => acc.concat(item.universities), [])
    };
  }
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
</style>
