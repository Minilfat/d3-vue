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

      const zoom = d3
        .zoom()
        .scaleExtent([1, 3])
        .on("zoom", zoomed);

      this.svg.call(zoom);

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
      // pattern.append("polygon").attr("points", "0,0 30,15 30,-15");
      // pattern.append("polygon").attr("points", "0,0 30,15 0,30");
      // pattern.append("polygon").attr("points", "0,30 30,15 30,45");
      // pattern.append("polygon").attr("points", "60,0 30,15 30,-15");
      // pattern.append("polygon").attr("points", "60,0 30,15 60,30");
      // pattern.append("polygon").attr("points", "60,30 30,15 30,45");

      // pattern
      //   .append("polygon")
      //   .attr("points", "0,0 50,0 0,75")
      //   .attr("fill", "pink");
      // pattern
      //   .append("polygon")
      //   .attr("points", "50,0 80,100 0,75")
      //   .attr("fill", "blue");
      // pattern
      //   .append("polygon")
      //   .attr("points", "0,75 80,100 0,100")
      //   .attr("fill", "red");
      // pattern
      //   .append("polygon")
      //   .attr("points", "50,0 80,100 120,0")
      //   .attr("fill", "green");
      // pattern
      //   .append("polygon")
      //   .attr("points", "80,100 120,0 120,100")
      //   .attr("fill", "yellow");
      // pattern.append("polygon").attr("points", "60,30 30,15 30,45");

      // const mainGradient = defs.append("linearGradient").attr("id", "mainGradient");
      // mainGradient
      //   .append("stop")
      //   .attr("class", "stop-left")
      //   .attr("offset", "0");

      // mainGradient
      //   .append("stop")
      //   .attr("class", "stop-right")
      //   .attr("offset", "1");

      // const pattern = this.svg.append("polygon").attr("points", "200,10 250,190 160,210");
      // pattern.classed("filled");

      const g = this.svg.append("g");

      g.attr("class", "region")
        .selectAll("path")
        .data(topojson.feature(topologyMap, topologyMap.objects.russia).features)
        .enter()
        .append("path")
        .attr("d", this.path)
        // .classed("filled", true)
        // .style("background", function() {
        //   // console.log(d);
        //   // console.log(d);
        //   // background: rgb(2,0,36);
        //   // background: linear-gradient(38deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(0,212,255,1) 100%);
        //   return "linear-gradient(38deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, rgba(0,212,255,1) 100%)";
        // })
        // .attr("stroke", "blue")
        // .attr("stroke-width", 2)
        // .style("opacity", 0.4)
        .on("click", function(event, d) {
          console.log(d);
          // console.log(this);
          // d3.select(this)
          //   .transition()
          //   .duration(300)
          //   .style("opacity", 1);
          // d.properties.region
          // console.log(d);
          // console.log(d.properties.region);
        });

      function zoomed({transform}) {
        g.attr("transform", transform);
      }
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
/* 
// #basicPattern polygon {
//   fill: #04adf0;

//   // &:nth-of-type(1),
//   // &:nth-of-type(3) {
//   //   fill: darken(#04adf0, 7%);
//   // }

//   // &:nth-of-type(2) {
//   //   fill: lighten(#04adf0, 5%);
//   // }
//   // &:nth-of-type(6),
//   // &:nth-of-type(4) {
//   //   fill: lighten(#04adf0, 10%);
//   // }
//   // &:nth-of-type(5) {
//   //   fill: darken(#04adf0, 10%);
//   // }

//   &:nth-of-type(1) {
//     fill: darken(#04adf0, 7%);
//   }

//   &:nth-of-type(2) {
//     fill: lighten(#04adf0, 5%);
//   }

//   &:nth-of-type(3) {
//     fill: lighten(#04adf0, 10%);
//   }
//   &:nth-of-type(5) {
//     fill: darken(#04adf0, 10%);
//   }
// } */
</style>
