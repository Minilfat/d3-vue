<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import * as topojson from "topojson-client";
import topologyMap from "./russia.json";
import { addBackgroundImagePattern } from "./helpers";
// import regionsCenters from "./regionCenters.json";

const w = 954;
const h = 560;

const CIRCLE_PROPS = {
  r: 6,
  fill: "#e73d73"
};

const MAP_POINT = {
  w: 38,
  h: 52,
  fill: "#e73d73"
};

export default {
  name: "Map",
  props: {
    universities: Array
  },
  data() {
    return {
      zoom: null,
      svg: null,
      svgG: null,
      projection: null,
      path: null,
      states: null,
      // regionToUniMap: {},
      // isSomeRegionZoomed: false,
      currentSelection: { node: null, id: null },
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
    loadData() {
      this.createMap();
      this.addBg();
      this.addCities();
      this.addUniversitiesToCities();
    },

    addCities() {
      const vm = this;

      this.universitiesСities = this.svgG
        .selectAll(".cities")
        .data(this.universities)
        .enter()
        .append("g")
        .attr("class", d => `${d.city} city-point`)
        .style("cursor", "pointer")
        .attr("transform", d => `translate(${this.projection([d.location.longitude, d.location.latitude])})`)
        .on("click", function(e, d) {
          vm.cityClickedHandler(this, d);
        });

      this.universitiesСities
        .append("circle")
        .attr("r", CIRCLE_PROPS.r)
        .attr("fill", CIRCLE_PROPS.fill);
    },

    cityClickedHandler(node, data) {
      if (data.universities.length === 1) {
        this.hideCity(node);
        this.showUniversity(data.universities[0].id);
      } else {
        this.suggestUniversities(node, data.universities);
      }
    },

    suggestUniversities(node, universities) {
      const total = universities.length;
      const wrapper = d3.select(node).append("g");
      const dx = 8;
      const dy = 20;
      const lineLength = 50;

      let selectedId;

      const initialLine = [
        { x: 0, y: 0 },
        { x: -dx, y: -dy },
        { x: dx, y: -dy }
      ];

      const line = d3
        .line()
        .x(d => d.x)
        .y(d => d.y);

      const animationDuration = 400;
      const path = wrapper
        .append("path")
        .datum(initialLine)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke-dasharray", lineLength + " " + lineLength)
        .attr("stroke-dashoffset", lineLength)
        .attr("fill", "none")
        .transition()
        .duration(animationDuration)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      universities.forEach(({ id }, i) => {
        const circleRadius = 15;
        const lineWidth = 24;

        const circle = wrapper
          .append("circle")
          .style("opacity", 0)
          .attr("r", circleRadius)
          .attr("cx", (2 * circleRadius + 2 * dx) * i + circleRadius + dx)
          .attr("cy", -dy)
          .attr("fill", `url(#${id}bg)`)
          .attr("stroke", CIRCLE_PROPS.fill)
          .attr("stroke-width", 3);

        circle
          .transition(animationDuration)
          .delay(animationDuration * i)
          .duration(animationDuration)
          .style("opacity", 1);

        circle.on("click", e => {
          e.stopPropagation();
          wrapper
            .transition()
            .duration(animationDuration)
            .style("opacity", 0)
            .remove()
            .on("end", () => {
              this.hideCity(node);
              this.showUniversity(id);
            });
        });

        if (i + 1 < total) {
          const lineStart = 2 * circleRadius * (i + 1) + 2 * dx * i + dx;
          wrapper
            .append("path")
            .datum([
              { x: lineStart, y: -dy },
              { x: lineStart + 2 * dx, y: -dy }
            ])
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke-dasharray", 2 * dx + " " + 2 * dx)
            .attr("stroke-dashoffset", 2 * dx)
            .attr("fill", "none")
            .transition()
            .duration(animationDuration)
            .delay(animationDuration * (i + 1) + 100)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
        }
      });
    },

    showUniversity(id) {
      const shownUni = d3.select(".city-point .university.shown");
      if (shownUni.node()) shownUni.classed("shown", false);

      d3.select(`#${id}`).classed("shown", true);
    },

    hideCity(node) {
      const hiddenCity = d3.select(".city-point circle.hidden");
      if (hiddenCity.node()) hiddenCity.classed("hidden", false).style("cursor", "pointer");

      d3.select(node)
        .select("circle")
        .classed("hidden", true)
        .style("cursor", "default");
    },

    addUniversitiesToCities() {
      this.universities.forEach(({ city, universities }) => {
        const cityG = d3.select(`.${city}`);
        const uniG = cityG
          .selectAll(".universities" + city)
          .data(universities)
          .enter()
          .append("g")
          .attr("id", d => d.id)
          .attr("transform", `translate(${-MAP_POINT.w / 2}, ${-MAP_POINT.h})`)
          .classed("university", true)
          .each(({ id, bgImageUrl }) => {
            addBackgroundImagePattern(this.svg.select("defs"), id + "bg", "https://cdn0.iconfinder.com/data/icons/flat-round-system/512/android-128.png");
          });

        uniG
          .append("path")
          .attr(
            "d",
            "m37.81794,19.33494c0,10.46259 -18.82207,32.31657 -18.82207,32.31657s-18.82207,-21.85398 -18.82207,-32.31657s8.427,-18.94413 18.82207,-18.94413s18.82207,8.48164 18.82207,18.94413z"
          )
          .attr("fill", MAP_POINT.fill);

        uniG
          .append("circle")
          .attr("r", 15)
          .attr("cx", MAP_POINT.w / 2)
          .attr("cy", MAP_POINT.w / 2)
          .attr("fill", ({ id }) => `url(#${id}bg)`);
      });
    },

    createMap() {
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

      this.svg.append("defs");
      this.svgG = this.svg.append("g");
      this.svgG
        .attr("class", "region")
        .selectAll("path")
        .data(this.states.features)
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("class", d => d.properties.region);
    },

    addBg() {
      const grad = this.svg
        .select("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

      grad
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#046bcb");
      grad
        .append("stop")
        .attr("offset", "10%")
        .attr("stop-color", "#0486de");
      grad
        .append("stop")
        .attr("offset", "20%")
        .attr("stop-color", "#046bcb");
      grad
        .append("stop")
        .attr("offset", "30%")
        .attr("stop-color", "#0486de");
      grad
        .append("stop")
        .attr("offset", "40%")
        .attr("stop-color", "#52c2f2");
      grad
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#0486de");
      grad
        .append("stop")
        .attr("offset", "60%")
        .attr("stop-color", "#046bcb");
      grad
        .append("stop")
        .attr("offset", "70%")
        .attr("stop-color", "#52c2f2");
      grad
        .append("stop")
        .attr("offset", "80%")
        .attr("stop-color", "#04cffb");
      grad
        .append("stop")
        .attr("offset", "90%")
        .attr("stop-color", "#52c2f2");
      grad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#046bcb");
    }
  },

  mounted() {
    this.loadData();
  }
};
</script>

<style>
#map .region {
  fill: url(#gradient);
}

.line {
  fill: none;
  stroke: #e73d73;
  stroke-width: 3;
}

.universitySelection.hidden {
  opacity: 0;
}

.city-point circle {
  opacity: 1;
  transition: opacity 500ms ease-in;
}
.city-point circle.hidden {
  opacity: 0;
}

.city-point .university {
  opacity: 0;
  transition: opacity 0.8s ease-in;
  visibility: hidden;
}

.city-point .university.shown {
  opacity: 1;
  visibility: visible;
}
</style>
