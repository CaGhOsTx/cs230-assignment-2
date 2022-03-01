"use strict";
import { Arrow } from "./Geometry.js";

export var scale = 1;

export default class Container {
    constructor() {
        this.ELEMENT = document.getElementsByClassName("svg pane")[0];
        this.arrow = new Arrow(this);
        console.log(this.ELEMENT);
        
        this.elements = [];
        this.ELEMENT.onwheel = (e) => {
            if (e.deltaY > 0)
                scale += 0.1;
            else if (scale > 0.2)
                scale -= 0.1;
            this.elements.forEach(e => e.ELEMENT.setAttribute("style", `transform: scale(${scale})`));
            if(scale < 0.5)
                this.ELEMENT.setAttribute("style", "background-size: 0");
            else 
                this.ELEMENT.setAttribute("style", "background-size: " + 5 * scale + "mm " + 5 * scale + "mm");
            this.arrow.updateArrow(0,0,0,0,this);
            console.log("updated" + this.arrow.printArrow())
            this.arrow.ELEMENT.setAttribute("style", `border-top:${scale * 5}px dashed cyan;`)
            this.arrow.ELEMENT.innerHTML = "";
            this.arrow.updateArrow(0,0, 0,0,this);
            console.log(this.ELEMENT);
            console.log("scale" + scale);
        };
    };
    addAll = (elements) => elements.forEach(e => this.add(e));
    add = (element) => this.elements.push(element);
    remove = (element) => {
        const index = this.elements.indexOf(element);
        this.elements.splice(index, index + 1);
    };
    getArrow = () => this.arrow;
    noAux = () => !Array.from(this.ELEMENT.children).some(e => e.id == "aux");
}
