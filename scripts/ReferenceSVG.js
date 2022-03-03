import {svg} from "./MainSVG.js";
import SVGElement from "./SVGElement.js";
import { svgPanel } from "./Main.js";
export let aux = new SVGElement(() => {
    let node = svg.ELEMENT.cloneNode(true);
    node.id = "aux";
    node.innerHTML = node.innerHTML.replaceAll(/ghost/ig, "a")
    return node;
});

aux.ELEMENT.onmousedown = (e) => {
    let arrow = svgPanel.getArrow();
    aux.onmousedown(e, svgPanel);
    aux.ELEMENT.onmousemove = (e) => {
        aux.onmousemove(e, svgPanel);
        arrow.updateArrow(null,null, e.pageX, e.pageY, svgPanel)
    }
    arrow.updateArrow(null, null, e.pageX, e.pageY, svgPanel)
}