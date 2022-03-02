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
    Array.from(document.body.getElementsByClassName("ELEMENT"))
        .filter(n => n.classList.contains("selected"))
        .forEach(n => n.classList.replace("selected", "unselected"));
}
document.getElementById("animate").onclick = (e) => {
    switch(uiController.currentAnimation) {
        case "translate" :
            console.log("animating translate")
            document.getElementById("ghost").innerHTML = 
            `
            <animateTransform attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="${document.getElementById('tX').value} ${document.getElementById('tY').value}"
                dur="${document.getElementById('dur').value}s"
                repeatCount="indefinite"
            />
            `
            break;
        case "rotate" :
            console.log("animating rotate")
            document.getElementById("ghost").innerHTML = 
            `
            <animateTransform attributeName="transform"
            attributeType="XML"
            type="rotate"
            
            to="${document.getElementById('rot').value}"
            dur="${document.getElementById('dur').value}s"
            repeatCount="indefinite"
            />
            `
            break;
        case "skew" :
            console.log("animating skew")
            document.getElementById("ghost").innerHTML = 
            `
            <animateTransform attributeName="transform"
            attributeType="XML"
            type="skewX"
            from="0"
            to="${document.getElementById('sX').value}"
            dur="${document.getElementById('dur').value}s"
            repeatCount="indefinite"
            />
            <animateTransform attributeName="transform"
            attributeType="XML"
            type="skewY"
            from="0"
            to="${document.getElementById('sY').value}"
            dur="${document.getElementById('dur').value}s"
            repeatCount="indefinite"
            />
            `
            break;
        case "color" :
            console.log("animating color")
            document.getElementById("ghost").innerHTML = 
            `
                <animate attributeName="fill" 
                values="${document.getElementById("cFrom").value};${document.getElementById("cTo").value};${document.getElementById("cFrom").value};" 
                dur="${document.getElementById('dur').value}s" 
                
                repeatCount="indefinite"/>
            `
            break;
        case "stroke" :
            console.log("animating stroke")
            document.getElementById("ghost").innerHTML = 
            `
            `
            break;
        case "scale" :
            console.log("animating scale")
            document.getElementById("ghost").innerHTML = 
            `
            <animateTransform attributeName="transform"
            attributeType="XML"
            type="scale"
            from="0 0"
            to="${document.getElementById('sX').value + " " + document.getElementById('sY').value}"
            dur="${document.getElementById('dur').value}s"
            repeatCount="indefinite"
            />
            `
            break;
        default:
    }
    console.log(document.getElementById("ghost").innerHTML)
}