import SVGElement from "./SVGElement.js"
import {svgPanel} from "./Main.js"
export let svg = new SVGElement(() => {
    let res = document.getElementsByClassName("ELEMENT")[0];
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