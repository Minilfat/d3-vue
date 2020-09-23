<template>
  <div id="map"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import topologyMap from "../assets/russia.json";

const MAP_COLORS = "cef0fb#04b4f4#05e1fc#04cffb#0497e8#52c2f2#30b7ee".split("#").map((c) => `#${c}`);

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
      this.addZoomBehavior();
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

      const city = this.svg
        .selectAll(".city")
        .data(places)
        .enter()
        .append("g")
        .attr("class", "city")
        .attr("transform", function (d) {
          return "translate(" + vm.projection([d.location.longitude, d.location.latitude]) + ")";
        });

      city.append("circle").attr("r", 5).style("fill", "red");
      // city
      //   .append("text")
      //   .attr("x", 5)
      //   .text(function (d) {
      //     return d.name;
      //   });
    },

    createMap() {
      // const vm = this;

      const w = 954;
      const h = 560;

      // const imgW = 96;
      // const imgH = 46;

      this.projection = d3
        .geoAlbers()
        .rotate([-105, 0])
        .center([-10, 65])
        .parallels([52, 64])
        .scale(700)
        .translate([w / 2, h / 2]);

      this.path = d3.geoPath().projection(this.projection);
      this.svg = d3.select("#map").append("svg").attr("width", w).attr("height", h);

      // const defs = this.svg.append("defs").append("pattern");
      // new Array(4).fill(1).forEach((i, index) => {
      //   const number = i + index;
      //   defs
      //     .append("pattern")
      //     .attr("id", `img${number}`)
      //     .attr("x", "0")
      //     .attr("y", "0")
      //     .attr("width", imgW)
      //     .attr("height", imgH)
      //     .attr("patternUnits", "userSpaceOnUse")
      //     .append("image")
      //     .attr("xlink:href", `${this.publicPath}${number}.png`);
      // });

      this.svg
        .append("g")
        .attr("class", "region")
        .selectAll("path")
        .data(topojson.feature(topologyMap, topologyMap.objects.russia).features)
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("fill", () => MAP_COLORS[Math.floor(Math.random() * 7)])
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .on("click", function (event, d) {
          console.log(d);
        });
    },

    addZoomBehavior() {
      const vm = this;
      const zoom = d3.zoom().scaleExtent([1, 5]).on("zoom", zoomed);
      this.svg.call(zoom);

      function zoomed({transform}) {
        vm.svg.attr("transform", transform);
        // d3.select("#avatar")
        //   .select("image")
        //   .attr("width", 954 / transform.k)
        //   .attr("height", 560 / transform.k);
        // d3.selectAll("g.city").attr("transform", function (d) {

        //   console.log("lon", d.location.longitude);
        //   console.log("lat", d.location.latitude);

        //   return (
        //     "translate(" +
        //     vm.projection([
        //       transform.x + d.location.longitude * transform.k,
        //       transform.y + d.location.latitude * transform.k,
        //     ]) +
        //     ")scale(" +
        //     transform.k +
        //     ")"
        //   );
        // });
      }
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
