<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import * as topojson from "topojson-client";
import topologyMap from "./russia.json";

const w = 954;
const h = 560;

const maxScale = 100;

export default {
  name: "Map",
  props: {
    places: Array,
  },
  data() {
    return {
      zoom: null,
      zoomedNode: null,
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
        .attr("transform", (d) => "translate(" + this.projection([d.location.longitude, d.location.latitude]) + ")");
    },

    createMap() {
      const states = topojson.feature(topologyMap, topologyMap.objects.russia);
      const vm = this;

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

      this.zoom = d3
        .zoom()
        .scaleExtent([1, maxScale])
        .on("zoom", zoomed);

      this.svgG = this.svg.append("g");
      this.svgG
        .attr("class", "region")
        .selectAll("path")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", this.path)
        .on("click", function(e, d) {
          vm.regionClicked(this, d, vm);
        });

      function zoomed({transform}) {
        vm.svgG.selectAll("circle.city").attr("r", 5 / transform.k);
        vm.svgG.attr("transform", transform);
      }
    },

    regionClicked(node, d, vm) {
      if (vm.zoomedNode && vm.zoomedNode === node) {
        vm.$set(vm, "zoomedNode", null);
        vm.svgG
          .transition()
          .duration(750)
          .call(vm.zoom.transform, d3.zoomIdentity)
          .on("end", resetVisibility);

        return;
      }

      vm.$set(vm, "zoomedNode", node);

      const bounds = vm.path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(maxScale, 0.9 / Math.max(dx / w, dy / h))),
        translate = [w / 2 - scale * x, h / 2 - scale * y];

      // vm.projection.fitSize([x, y], d);

      vm.svgG
        .transition()
        .duration(750)
        .call(vm.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
        .on("end", resetVisibility);

      function resetVisibility() {
        vm.svgG.selectAll(".city").classed("hidden", !!vm.zoomedNode);
        vm.svgG.selectAll(".region path").classed("hidden", function(data) {
          // if (data.properties.region === d.properties.region) console.log("hui");
          // console.log(vm.zoomedNode);
          return !!vm.zoomedNode && data.properties.region !== d.properties.region;
        });
      }
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

#map .city,
#map .region path {
  opacity: 1;
  transition: opacity 400ms ease-in;
}

#map .city.hidden,
#map .region path.hidden {
  opacity: 0.3;
}
</style>
