export function addBackgroundImagePattern(svgDefs, id, imageUrl) {
  svgDefs
    .append("pattern")
    .attr("id", id)
    .attr("width", 30)
    .attr("height", 30)
    .append("image")
    .attr("xlink:href", imageUrl)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30);
}
