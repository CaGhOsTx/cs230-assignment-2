import SVGElement from "./SVGElement.js"
import {svgPanel} from "./Main.js"
//implementation for the main svg element
export let svg = new SVGElement(() => {
    let element = document.getElementsByClassName("ELEMENT")[0];
    return element
});
//aggregates on the predefined onmousedown/move event listeners
svg.ELEMENT.onmousedown = (e) => {
    //bond the arrow with this element (updating its position as this element moves)
    let arrow = svgPanel.getArrow();
    svg.onmousedown(e, svgPanel);
    svg.ELEMENT.onmousemove = (e) => {
        svg.onmousemove(e, svgPanel);
        arrow.updateArrow(e.pageX, e.pageY,null, null, svgPanel)
    }
    arrow.updateArrow(e.pageX, e.pageY,null, null, svgPanel)
}