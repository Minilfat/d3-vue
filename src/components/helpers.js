export function addBackgroundImagePattern(svgDefs, id, imageUrl) {
  svgDefs
    .append("pattern")
    .attr("id", id)
    .attr("width", 40)
    .attr("height", 40)
    .append("image")
    .attr("xlink:href", imageUrl)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 40)
    .attr("height", 40);
}
