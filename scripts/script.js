"use strict"
import Container from "./Container.js";
import {svg} from "./SVG.js";
import {aux} from "./helper.js";
import * as menus from "./AnimationMenus.js";

export const svgPanel = new Container();
const animMenu = document.getElementById("animMenu");
svgPanel.addAll([svg,aux])

const translate = document.getElementById("translate");
const rotate = document.getElementById("rotate");
const skew = document.getElementById("skew");
const color = document.getElementById("color");
const stroke = document.getElementById("stroke");
const scale = document.getElementById("scale");

const buttons = [translate, rotate, skew, color, stroke, scale];
let currentAnimation;
buttons.forEach(button => button.onmousedown = () => {
    injectMenu(button);
});
translate.onmousedown = () => {
    injectMenu(translate);
    svgPanel.ELEMENT.appendChild(aux.ELEMENT);
    svgPanel.ELEMENT.appendChild(svgPanel.getArrow().ELEMENT)
}

window.onkeydown = (key) => {
    if(key.code === "Escape") {
        svgPanel.ELEMENT.removeChild(aux.ELEMENT);
        svgPanel.ELEMENT.removeChild(svgPanel.getArrow().ELEMENT);
    }
}

window.onmousedown = (e) => {
    console.log("unselecting")
    Array.from(document.body.getElementsByTagName("img"))
        .filter(n => n.classList.contains("selected"))
        .forEach(n => n.classList.replace("selected", "unselected"));
}
function injectMenu(button) {
    console.log("injecting" + button)
    if (button.id != currentAnimation) {
        console.log("changing animation");
        console.log(animMenu)
        animMenu.innerHTML = menus.fromID(currentAnimation = button.id);
    }
}

