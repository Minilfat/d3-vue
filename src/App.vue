<template>
  <div id="app">
    <Map :universities="universities" />
  </div>
</template>

<script>
import Map from "./components/Map.vue";

const data = [
  {
    location: { latitude: 59.9574001, longitude: 30.3061542 },
    region: "RU-SPE",
  },
  {
    location: { latitude: 53.2120118, longitude: 50.1753568 },
    region: "RU-SAM",
  },
  {
    location: { latitude: 60.005121, longitude: 30.369889 },
    region: "RU-SPE",
  },
  {
    location: { latitude: 56.9219608, longitude: 84.950256 },
    region: "RU-TOM",
  },
  {
    location: { latitude: 57.1590108, longitude: 65.5279635 },
    region: "RU-TYU",
  },
  {
    location: { latitude: 56.8403246, longitude: 60.6138365 },
    region: "RU-SVE",
  },
  {
    location: { latitude: 55.7614635, longitude: 37.6309452 },
    region: "RU-MOW",
  },
  {
    location: { latitude: 59.9800492, longitude: 30.3250261 },
    region: "RU-SPE",
  },
  {
    location: { latitude: 56.3299584, longitude: 43.9201353 },
    region: "RU-NIZ",
  },
  {
    location: { latitude: 58.010727, longitude: 56.2798073 },
    region: "RU-PER",
  },
  {
    location: { latitude: 56.2985946, longitude: 43.9790292 },
    region: "RU-NIZ",
  },
  {
    location: { latitude: 55.1604494, longitude: 61.3679071 },
    region: "RU-CHE",
  },
  {
    location: { latitude: 55.9296723, longitude: 37.5167821 },
    region: "RU-MOS",
  },
  {
    location: { latitude: 59.9718081, longitude: 30.2989611 },
    region: "RU-SPE",
  },
  {
    location: { latitude: 54.8453476, longitude: 83.0904755 },
    region: "RU-NVS",
  },
  {
    location: { latitude: 54.7242934, longitude: 20.5252919 },
    region: "RU-KGD",
  },
  {
    location: { latitude: 43.4335161, longitude: 39.9156999 },
    region: "RU-KDA",
  },
  {
    location: { latitude: 55.6505192, longitude: 37.4997957 },
    region: "RU-MOW",
  },
  {
    location: { latitude: 55.7273655, longitude: 37.5925208 },
    region: "RU-MOW",
  },
  {
    location: { latitude: 55.731551, longitude: 37.5695283 },
    region: "RU-MOW",
  },
  {
    location: { latitude: 55.6512482, longitude: 37.6570191 },
    region: "RU-MOW",
  },
  { location: { latitude: 55.790447, longitude: 49.1192462 }, region: "RU-TA" },
  {
    location: { latitude: 55.0080181, longitude: 82.867719 },
    region: "RU-NVS",
  },
  { location: { latitude: 56.4695, longitude: 84.9453243 }, region: "RU-TOM" },
  {
    location: { latitude: 43.0244636, longitude: 131.8916229 },
    region: "RU-PRI",
  },
  {
    location: { latitude: 55.022545, longitude: 82.9158592 },
    region: "RU-NVS",
  },
  {
    location: { latitude: 56.0099917, longitude: 92.7690147 },
    region: "RU-KYA",
  },
  {
    location: { latitude: 55.1367954, longitude: 60.2646142 },
    region: "RU-CHE",
  },
  {
    location: { latitude: 55.143134, longitude: 60.1484693 },
    region: "RU-CHE",
  },
  {
    location: { latitude: 60.945878, longitude: 76.5543872 },
    region: "RU-KHM",
  },
];

export default {
  name: "App",
  components: {
    Map,
  },
  data() {
    return {
      universities: data,
    };
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
</style>
