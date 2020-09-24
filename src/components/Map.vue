<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import topologyMap from "./russia.json";

const w = 954;
const h = 560;

export default {
  name: "Map",
  props: {
    places: Array,
  },
  data() {
    return {
      svg: null,
      svgG: null,
      projection: null,
      path: null,
      publicPath: process.env.BASE_URL,
      navigatedPoint: null,
    };
  },
  methods: {
    loadData() {
      this.createMap();
      this.addBg();
      this.addUnis();
    },

    addUnis() {
      this.svgG
        .selectAll(".city")
        .data(this.places)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill", "red")
        .style("cursor", "pointer")
        .attr("class", "city")
        .attr("transform", (d) => "translate(" + this.projection([d.location.longitude, d.location.latitude]) + ")")
        .on("click", clicked);

      const vm = this;

      function clicked(e, d) {
        const [toX, toY] = vm.projection([d.location.longitude, d.location.latitude]);
        let k = 1,
          x = 0,
          y = 0;

        if (vm.navigatedPoint && vm.navigatedPoint[0] === toX && vm.navigatedPoint[1] === toY) {
          vm.$set(vm, "navigatedPoint", null);
        } else {
          [x, y] = [toX, toY];
          k = 2;
          vm.$set(vm, "navigatedPoint", [x, y]);
        }

        vm.svgG
          .transition()
          .duration(750)
          .attr("transform", "translate(" + -x + "," + -y + ")scale(" + k + ")");
      }
    },

    createMap() {
      this.projection = d3
        .geoAlbers()
        .rotate([-105, 0])
        .center([-10, 65])
        .parallels([52, 64])
        .scale(700)
        .translate([w / 2, h / 2]);

      this.path = d3.geoPath().projection(this.projection);
      this.svg = d3
        .select("#map")
        .append("svg")
        .attr("width", w + "px")
        .attr("height", h + "px");

      this.svgG = this.svg.append("g");
      this.svgG
        .attr("class", "region")
        .selectAll("path")
        .data(topojson.feature(topologyMap, topologyMap.objects.russia).features)
        .enter()
        .append("path")
        .attr("d", this.path);
    },
    addBg() {
      const grad = this.svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

      grad
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#046bcb");

      grad
        .append("stop")
        .attr("offset", "15%")
        .attr("stop-color", "#0486de");

      grad
        .append("stop")
        .attr("offset", "40%")
        .attr("stop-color", "#04cffb");

      grad
        .append("stop")
        .attr("offset", "70%")
        .attr("stop-color", "#52c2f2");

      grad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#046bcb");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
#map .region {
  fill: url(#gradient);
}
</style>
