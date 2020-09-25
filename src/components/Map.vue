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
      states: null,
      stateCenters: null,
      isSomeRegionZoomed: false,
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    loadData() {
      this.createMap();
      this.addBg();
      this.distributeUiversitiesToStates();
      this.addUnis();
    },

    addUnis() {
      const vm = this;

      const data =
        Object.keys(this.stateCenters).length > 0
          ? Object.keys(this.stateCenters).reduce((acc, key) => {
              const object = { region: key, data: this.stateCenters[key] };
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
        .attr("transform", function (d) {
          return `translate(${d.data.coordinates})`;
        })
        .on("click", function (e, d) {
          const { region } = d;
          const { feature } = vm.stateCenters[region];
          vm.zoomToRegion(feature);
        });

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
        .text((d) => d.data.count);

      // function clicked(e, d) {
      //   const [x, y] = vm.projection([
      //     d.location.longitude,
      //     d.location.latitude,
      //   ]);
      //   const translate = [w / 2 - cityScale * x, h / 2 - cityScale * y];
      //   vm.svgG
      //     .transition()
      //     .duration(750)
      //     .call(
      //       vm.zoom.transform,
      //       d3.zoomIdentity
      //         .translate(translate[0], translate[1])
      //         .scale(cityScale)
      //     );
      //   //   .on("end", resetVisibility);
      // }
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
        .on("click", this.zoomOutRegion);
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

    zoomToRegion(d) {
      this.isSomeRegionZoomed = true;
      this.resetVisibility(d.properties.region);

      const bounds = this.path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(maxScale, 0.9 / Math.max(dx / w, dy / h))),
        translate = [w / 2 - scale * x, h / 2 - scale * y];

      this.svgG
        .transition()
        .delay(450)
        .duration(750)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );
    },

    zoomOutRegion() {
      this.isSomeRegionZoomed = false;
      this.resetVisibility();
      this.svgG
        .transition()
        .delay(400)
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    },

    resetVisibility(region) {
      const vm = this;
      this.svgG
        .selectAll(".stateCenter")
        .classed("hidden", this.isSomeRegionZoomed);

      this.svgG.selectAll(".region path").classed("hidden", function (data) {
        return vm.isSomeRegionZoomed && data.properties.region !== region;
      });
    },

    distributeUiversitiesToStates() {
      const points = this.places.map((place) => {
        return this.projection([
          place.location.longitude,
          place.location.latitude,
        ]);
      });

      const distibuted = {};

      for (let i = 0; i < this.states.features.length; i++) {
        const feature = this.states.features[i];
        const regionBounds = this.path.bounds(feature);

        if (
          regionBounds[0].some((i) => i === Infinity || i === -Infinity) ||
          regionBounds[0].some((i) => i === Infinity || i === -Infinity)
        )
          continue;

        for (let j = 0; j < points.length; j++) {
          const [x, y] = points[j];

          const isBetweenX = x < regionBounds[1][0] && x > regionBounds[0][0];
          const isBetweenY = y < regionBounds[1][1] && y > regionBounds[0][1];

          if (isBetweenX && isBetweenY) {
            const { region } = feature.properties;
            if (distibuted[region]) {
              distibuted[region].count = distibuted[region].count + 1;
            } else {
              distibuted[region] = {};
              distibuted[region].feature = feature;
              distibuted[region].count = 1;
              distibuted[region].coordinates = this.path.centroid(feature);
              if (region === "RU-MOS") {
                distibuted[region].coordinates = [140, 200];
              }
            }
          }
        }
      }

      this.stateCenters = distibuted;
    },

    addBg() {
      const grad = this.svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

      grad.append("stop").attr("offset", "0%").attr("stop-color", "#046bcb");
      grad.append("stop").attr("offset", "15%").attr("stop-color", "#0486de");
      grad.append("stop").attr("offset", "40%").attr("stop-color", "#04cffb");
      grad.append("stop").attr("offset", "70%").attr("stop-color", "#52c2f2");
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

#map .stateCenter,
#map .region path {
  opacity: 1;
  transition: opacity 400ms ease-in;
}

#map .stateCenter.hidden,
#map .region path.hidden {
  opacity: 0;
}
</style>
