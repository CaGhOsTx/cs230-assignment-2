"use strict"
import Container from "./Container.js";
import {svg} from "./MainSVG.js";
import {aux} from "./ReferenceSVG.js";
import * as uiOptions from "./AnimationMenus.js";
import AnimationUIController from "./AnimationUIController.js";

export const svgPanel = new Container();

const uiController = new AnimationUIController(
    Array.from(document.getElementById("control").children), 
    uiOptions, document.getElementById("animMenu"), 
    document.getElementById("animate"));

svgPanel.addAll([svg,aux])
const translate = document.getElementById("translate");

translate.onmousedown = () => {
    console.log("clicked on translate")
    uiController.inject(translate);
    addTranslateHelperTools();
}

window.onkeydown = (key) => {
    if(key.code === "Escape") {
        removeHelperTools();
    }
}

window.onmousedown = () => {
    Array.from(document.body.getElementsByClassName("ELEMENT"))
        .filter(n => n.classList.contains("selected"))
        .forEach(n => n.classList.replace("selected", "unselected"));
}


function addTranslateHelperTools() {
    svgPanel.ELEMENT.appendChild(aux.ELEMENT);
    svgPanel.ELEMENT.appendChild(svgPanel.getArrow().ELEMENT);
}

export function removeHelperTools () {
    if(svgPanel.ELEMENT.querySelector("#aux"))
        svgPanel.ELEMENT.removeChild(aux.ELEMENT);
    if(svgPanel.ELEMENT.querySelector("#arrow"))
        svgPanel.ELEMENT.removeChild(svgPanel.getArrow().ELEMENT);
}

let text = document.getElementById("text");
let toggle = true;
document.getElementById("code").onclick = () => {
    text.innerText = toggle?  svg.ELEMENT.innerHTML : "";
    svgPanel.ELEMENT.classList.toggle("asText");
    toggle = !toggle;
}

document.getElementById("download").onclick = () => download();

const download = () => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent("<put the code of your svg here>"));
    element.setAttribute('download', "<name of file>");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


















  alert(`disclaimer! I really didnt have enough time to make this much better, but the idea behind it interest me quite a lot! 
  I will definitelly add more features to this in the future. 
    More user selectable animation options,
    Animation chaining, 
    a temporal displacement ui component as well to offset animations in time would be nice too.`);