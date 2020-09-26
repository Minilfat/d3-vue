<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import * as topojson from "topojson-client";
import topologyMap from "./russia.json";
import regionsCenters from "./regionCenters.json";

const w = 954;
const h = 560;

const maxScale = 100;
const cityScale = 250;
const circleRadius = 3;

const svgTextProps = {
  fontSize: 13,
  dx: 5,
  dy: -1,
};

export default {
  name: "Map",
  props: {
    universities: Array,
  },
  data() {
    return {
      zoom: null,
      svg: null,
      svgG: null,
      projection: null,
      path: null,
      states: null,
      regionToUniMap: {},
      isSomeRegionZoomed: false,
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    loadData() {
      this.createMap();
      this.addBg();
      this.distributeUiversitiesToStates();
      this.addStateCentersToMap();
      this.addUniversities();
    },

    addUniversities() {
      const universities = this.svgG
        .selectAll(".universities")
        .data(this.universities)
        .enter()
        .append("g")
        .attr("class", "university")
        .style("cursor", "pointer")
        .attr("transform", (d) => {
          return `translate(${this.projection([
            d.location.longitude,
            d.location.latitude,
          ])})`;
        })
        .on("click", function (e, d) {
          console.log(d.region);
        });
      universities.append("circle").attr("r", 2).attr("fill", "red");
    },

    addStateCentersToMap() {
      const vm = this;
      const data =
        Object.keys(this.regionToUniMap).length > 0
          ? Object.keys(this.regionToUniMap).reduce((acc, key) => {
              const object = { region: key, data: this.regionToUniMap[key] };
              acc.push(object);

              return acc;
            }, [])
          : [];

      const enteredElements = this.svgG
        .selectAll(".regionCenters")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "stateCenter")
        .style("cursor", "pointer")
        .attr("transform", (d) => `translate(${d.data.centroid})`)
        .on("click", (e, d) => this.zoomToUniversities(d));

      enteredElements
        .append("circle")
        .attr("r", circleRadius)
        .attr("fill", "#fff");

      enteredElements
        .append("text")
        .attr("dx", svgTextProps.dx)
        .attr("dy", svgTextProps.dy)
        .style("fill", "#000")
        .style("font-size", svgTextProps.fontSize)
        .text((d) => d.data.universities.length);
    },

    createMap() {
      const vm = this;

      this.states = topojson.feature(topologyMap, topologyMap.objects.russia);
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
        .on("zoom", ({ transform }) => this.handleZoom(transform));

      this.svgG = this.svg.append("g");
      this.svgG
        .attr("class", "region")
        .selectAll("path")
        .data(this.states.features)
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("class", (d) => d.properties.region)
        .on("click", (e, d) => {
          console.log(d.properties.region);
          this.zoomOutRegion();
        });
    },

    handleZoom(transform) {
      this.svgG.attr("transform", transform);

      this.svgG
        .selectAll("text")
        .attr("dx", svgTextProps.dx / transform.k)
        .attr("dy", svgTextProps.dy / transform.k)
        .style("font-size", svgTextProps.fontSize / transform.k);

      this.svgG
        .selectAll("circle")
        .attr("r", circleRadius / transform.k)
        .attr("stroke-width", 1 / transform.k);
    },

    zoomToUniversities(d) {
      console.log(d);
      this.isSomeRegionZoomed = true;
      this.resetVisibility(d.region);

      this.svgG
        .selectAll(".stateCenter")
        .classed("hidden", true)
        .style("cursor", "none");

      const [x, y] = this.projection([
        d.data.universities[0].longitude,
        d.data.universities[0].latitude,
      ]);
      console.log(x, y);

      const scale = 150,
        translate = [w / 2 - scale * x, h / 2 - scale * y];

      // const bounds = this.path.bounds(d),
      //   dx = bounds[1][0] - bounds[0][0],
      //   dy = bounds[1][1] - bounds[0][1],
      //   x = (bounds[0][0] + bounds[1][0]) / 2,
      //   y = (bounds[0][1] + bounds[1][1]) / 2,
      //   scale = Math.max(1, Math.min(maxScale, 0.9 / Math.max(dx / w, dy / h))),
      //   ;

      this.svgG
        .transition()
        .delay(450)
        .duration(750)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        )
        .on("end", () => {
          console.log("end");
          // window.dispatchEvent(new Event("resize"));
        });
    },

    zoomOutRegion() {
      this.isSomeRegionZoomed = false;
      this.resetVisibility();
      this.svgG
        .transition()
        .delay(400)
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity)
        .on("end", () => {
          this.svgG
            .selectAll(".stateCenter")
            .classed("hidden", false)
            .style("cursor", "pointer");
        });
    },

    resetVisibility(region) {
      const vm = this;

      this.svgG.selectAll(".region path").classed("hidden", function (data) {
        return vm.isSomeRegionZoomed && data.properties.region !== region;
      });
    },

    distributeUiversitiesToStates() {
      const regionToUniMap = this.universities.reduce((acc, uni) => {
        !acc[uni.region]
          ? (acc[uni.region] = {
              universities: [uni.location],
              centroid: regionsCenters[uni.region],
            })
          : acc[uni.region].universities.push(uni.location);

        return acc;
      }, {});

      this.regionToUniMap = regionToUniMap;
    },

    addBg() {
      const grad = this.svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

      grad.append("stop").attr("offset", "0%").attr("stop-color", "#046bcb");
      grad.append("stop").attr("offset", "10%").attr("stop-color", "#0486de");
      grad.append("stop").attr("offset", "20%").attr("stop-color", "#046bcb");
      grad.append("stop").attr("offset", "30%").attr("stop-color", "#0486de");
      grad.append("stop").attr("offset", "40%").attr("stop-color", "#52c2f2");
      grad.append("stop").attr("offset", "50%").attr("stop-color", "#0486de");
      grad.append("stop").attr("offset", "60%").attr("stop-color", "#046bcb");
      grad.append("stop").attr("offset", "70%").attr("stop-color", "#52c2f2");
      grad.append("stop").attr("offset", "80%").attr("stop-color", "#04cffb");
      grad.append("stop").attr("offset", "90%").attr("stop-color", "#52c2f2");
      grad.append("stop").attr("offset", "100%").attr("stop-color", "#046bcb");
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

#map .stateCenter {
  opacity: 1;
  transition: opacity 200ms ease-in;
}

#map .region path {
  opacity: 1;
  transition: opacity 200ms ease-in 200ms;
}

#map .stateCenter.hidden,
#map .region path.hidden {
  opacity: 0;
}
</style>
