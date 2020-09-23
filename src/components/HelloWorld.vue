<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";

import topologyMap from "../assets/russia.json";
console.log(topologyMap);

const MAP_URL =
  "https://raw.githubusercontent.com/alfonsoprado/russia-map-geojson-topojson/master/russia.topojson.json";

export default {
  name: "HelloWorld",
  data() {
    return {
      jsonMap: {},
      svg: null,
      projection: null,
    };
  },
  methods: {
    async loadData() {
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
          console.log(d);
          return "translate(" + vm.projection([d.location.longitude, d.location.latitude]) + ")";
        });
      console.log(city);

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
      const vm = this;
      const w = 975;
      const h = 610;
      const objectName = "collection";

      this.projection = d3.geoMercator().rotate([-11, 2]);

      const path = d3
        .geoPath()
        .projection(this.projection)
        .pointRadius(2);

      this.svg = d3
        .select("#map")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const g = this.svg.append("g");

      centerZoom(vm.jsonMap, objectName, this.projection, path, w, h);
      drawStates(g, vm.jsonMap, objectName);

      function centerZoom(data, objectName, projection, path, width, height) {
        const o = topojson.mesh(data, data.objects[objectName], function(a, b) {
          return a === b;
        });

        projection.scale(1).translate([0, 0]);

        const b = path.bounds(o),
          s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
          t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection.scale(s).translate(t);
      }

      function drawStates(g, data, objectName) {
        const states = g
          .selectAll(".state")
          .data(topojson.feature(data, data.objects[objectName]).features)
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", path)
          .style("fill", "red");
        // .style("stroke", "#3a403d")
        // .style("stroke-width", "1px")
        // .attr("cursor", "pointer")
        // .on("mouseover", function() {
        //   d3.select(this)
        //     .attr("r", 10)
        //     .style("fill", "red");
        // })
        // .on("mouseout", function() {
        //   d3.select(this)
        //     .attr("r", 5.5)
        //     .style("fill", "#fff8ee");
        // })
        // .on("click", function(item) {
        //   console.log(item);
        // });

        return states;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
