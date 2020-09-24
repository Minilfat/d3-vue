<template>
  <div id="app">
    <Map :places="places" />
  </div>
</template>

<script>
import Map from "./components/Map.vue";

const data = [
  {name: "MSC", location: {latitude: 55.75222, longitude: 37.61556}},
  {name: "GAVNA", location: {latitude: 59.89444, longitude: 30.26417}},
  {name: "EKAT", location: {latitude: 59.5638, longitude: 150.80347}},
  {name: "Krasnoyarsk", location: {latitude: 56.010569, longitude: 92.852545}},
  {name: "Kalina", location: {latitude: 54.70739, longitude: 20.507307}},
];

export default {
  name: "App",
  components: {
    Map,
  },
  data() {
    return {
      places: data,
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
