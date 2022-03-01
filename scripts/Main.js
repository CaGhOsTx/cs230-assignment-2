"use strict"
import Container from "./Container.js";
import {svg} from "./MainSVG.js";
import {aux} from "./ReferenceSVG.js";
import * as uiOptions from "./AnimationMenus.js";
import AnimationUIController from "./AnimationUIController.js";


export const svgPanel = new Container();

const uiController = new AnimationUIController(
    Array.from(document.getElementById("control").children), 
    uiOptions, document.getElementById("animMenu"));

svgPanel.addAll([svg,aux])

const translate = document.getElementById("translate");

translate.onmousedown = () => {
    console.log("clicked on translate")
    uiController.inject(translate);
    svgPanel.ELEMENT.appendChild(aux.ELEMENT);
    svgPanel.ELEMENT.appendChild(svgPanel.getArrow().ELEMENT)
}

window.onkeydown = (key) => {
    if(key.code === "Escape") {
        svgPanel.ELEMENT.removeChild(aux.ELEMENT);
        svgPanel.ELEMENT.removeChild(svgPanel.getArrow().ELEMENT);
    }
}

window.onmousedown = () => {
    Array.from(document.body.getElementsByTagName("img"))
        .filter(n => n.classList.contains("selected"))
        .forEach(n => n.classList.replace("selected", "unselected"));
}
document.getElementById("animate").onclick = (e) => {
    
}