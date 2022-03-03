"use strict"
import Container from "./Container.js";
import {svg} from "./MainSVG.js";
import {aux} from "./ReferenceSVG.js";
import * as uiOptions from "./AnimationMenus.js";
import AnimationUIController from "./AnimationUIController.js";

export const svgPanel = new Container();

//function that makes the svg parent container a fixed size in order for the transformation ui to work predictably. (scaling messes up the actual length the animation moves etc..)
setFixedScalingFactorToSVG();
//create new UI controller with the UI options "enum" and the animate button as parameters
const uiController = new AnimationUIController(
    Array.from(document.getElementById("control").children), 
    uiOptions, document.getElementById("animMenu"), 
    document.getElementById("animate"));

//workaround (these objects are in a sort of cyclic dependency because the original code was all jumbled up together when I started writing this. 
//I however didnt have time to refactor nicely, but I will do so in the future)
svgPanel.addAll([svg,aux])
const translate = document.getElementById("translate");

//overrides the original onmousedown set for each button to add the auxilliary ghost and line between them
translate.onmousedown = () => {
    uiController.inject(translate);
    addTranslateHelperTools();
}
//enables removing of the added above using the escape key
window.onkeydown = (key) => {
    if(key.code === "Escape") {
        removeHelperTools();
    }
    else if(key.code === "Enter") {
        document.getElementById("animate").click();
    }
}
// global function to unselect any previously selected element if the user clicks outside of it
// toggles between selected and unselected CSS styles
window.onmousedown = () => {
    Array.from(document.body.getElementsByClassName("ELEMENT"))
        .filter(n => n.classList.contains("selected"))
        .forEach(n => n.classList.replace("selected", "unselected"));
}

//inserts the auxiliary svg and line when transforming
function addTranslateHelperTools() {
    svgPanel.ELEMENT.appendChild(aux.ELEMENT);
    svgPanel.ELEMENT.appendChild(svgPanel.getArrow().ELEMENT);
}
//removes the auxiliary svg and line
export function removeHelperTools () {
    if(svgPanel.ELEMENT.querySelector("#aux"))
        svgPanel.ELEMENT.removeChild(aux.ELEMENT);
    if(svgPanel.ELEMENT.querySelector("#arrow"))
        svgPanel.ELEMENT.removeChild(svgPanel.getArrow().ELEMENT);
}

//enables the toggle between svg and source
let text = document.getElementById("text");
let toggle = true; //toggle state 
document.getElementById("code").onclick = () => {
    text.innerText = toggle?  svg.ELEMENT.innerHTML : "";
    svgPanel.ELEMENT.classList.toggle("asText"); //applies asText class (which makes any element that is not the text element hidden)
    toggle = !toggle;
}

//got this from stack overflow, (https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery) I'm still to learn HTTP so I don't quite understand how this works yet :/
document.getElementById("download").onclick = () => download();

const download = () => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent("<style>body{background-color:black;width=100%;height100%;overflow:hidden} body > * {width: 50%; height: 50%};</style>" + document.getElementsByClassName("ELEMENT")[0].innerHTML));
    element.setAttribute('download', "ghost with " + uiController.currentAnimation);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


//explained line 10
function setFixedScalingFactorToSVG() {
    let ghost = document.getElementsByTagName("svg")[0];
    //obtain the size of the svg viewbox (this is so it would work for any svg file imported and not just this specific one)
    let wt = ghost.viewBox.baseVal.width;
    let ht = ghost.viewBox.baseVal.height;
    //embed a class to set the width and height of the parent containing the svg element
    var sheet = document.createElement('style');
    sheet.innerHTML = `.ELEMENT {width: ${wt}; height:${ht}}`;
    document.body.appendChild(sheet);
}

/*
  alert(`disclaimer! I really didnt have enough time to make this much better, but the idea behind it interest me quite a lot! 
  I will definitelly add more features to this in the future. 
    More user selectable animation options,
    Animation chaining, 
    a temporal displacement ui component as well to offset animations in time would be nice too.`);*/