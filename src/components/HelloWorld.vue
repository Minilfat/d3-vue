<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import topologyMap from "./russia.json";

// const MAP_COLORS = "cef0fb#04b4f4#05e1fc#04cffb#0497e8#52c2f2#30b7ee".split("#").map((c) => `#${c}`);

const w = 954;
const h = 560;

export default {
  name: "HelloWorld",
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
      this.addUnis();
    },

    addUnis() {
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
        {
          name: "Krasnoyarsk",
          location: {
            latitude: 56.010569,
            longitude: 92.852545,
          },
        },
      ];

      this.svgG
        .selectAll(".city")
        .data(places)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill", "red")
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
      // .attr("stroke", "#fff")
      // .attr("stroke-width", 1);
    },
    addBg() {
      //  this.svg = d3
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
#map {
  overflow: hidden;
}
.img1 {
  fill: url(#img1);
}
.img2 {
  fill: url(#img2);
}
.img3 {
  fill: url(#img3);
}
.img4 {
  fill: url(#img4);
}
</style>
