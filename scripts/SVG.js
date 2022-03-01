import SVGElement from "./SVGElement.js"
import {svgPanel} from "./script.js"
export const svg = new SVGElement(() => {
    let res = document.getElementById("svg");
    return res
});

svg.ELEMENT.onmousedown = (e) => {
    let arrow = svgPanel.getArrow();
    svg.onmousedown(e, svgPanel);
    svg.ELEMENT.onmousemove = (e) => {
        svg.onmousemove(e, svgPanel);
        arrow.updateArrow(e.pageX, e.pageY,null, null, svgPanel)
    }
    arrow.updateArrow(e.pageX, e.pageY,null, null, svgPanel)
}