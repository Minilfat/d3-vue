<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import topologyMap from "../assets/russia.json";

// const MAP_URL =
// "https://raw.githubusercontent.com/alfonsoprado/russia-map-geojson-topojson/master/russia.topojson.json";

export default {
  name: "HelloWorld",
  data() {
    return {
      jsonMap: {},
      svg: null,
      projection: null,
      path: null,
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    loadData() {
      this.createMap();
      this.addUnis();
    },

    addUnis() {
      const vm = this;
      const places = [
        {
          name: "MSC",
          location: {
            latitude: 55.75222,
            longitude: 37.61556,
          },
        },
        {
          name: "GAVNA",
          location: {
            latitude: 59.89444,
            longitude: 30.26417,
          },
        },
        {
          name: "EKAT",

          location: {
            latitude: 59.5638,
            longitude: 150.80347,
          },
        },
      ];

      // const g = vm.svg.append("g");
      const city = this.svg
        .selectAll(".city")
        .data(places)
        .enter()
        .append("g")
        .attr("class", "city")
        .attr("transform", function(d) {
          // console.log(d);
          return "translate(" + vm.projection([d.location.longitude, d.location.latitude]) + ")";
        });
      // console.log(city);

      city
        .append("circle")
        .attr("r", 3)
        .style("fill", "black")
        .style("opacity", 0.75);

      city
        .append("text")
        .attr("x", 5)
        .text(function(d) {
          return d.name;
        });
    },

    createMap() {
      // const vm = this;

      const w = 954;
      const h = 560;

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
        .attr("width", w)
        .attr("height", h);

      const defs = this.svg.append("defs");

      const pattern = defs
        .append("pattern")
        .attr("id", "basicPattern")
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", "954")
        .attr("height", "560")
        .attr("patternUnits", "userSpaceOnUse");

      pattern.append("image").attr("href", `${this.publicPath}bg.png`);

      this.svg
        .append("g")
        .attr("class", "region")
        .selectAll("path")
        .data(topojson.feature(topologyMap, topologyMap.objects.russia).features)
        .enter()
        .append("path")
        .attr("d", this.path)

        .on("click", function(event, d) {
          console.log(d);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.region {
  fill: url(#basicPattern);
}
</style>
