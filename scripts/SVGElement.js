"use strict";
import { scale } from "./Container.js";

export default class SVGElement {
    constructor(ELEMENT) {
        this.ELEMENT = ELEMENT();
        this.ELEMENT.onmousedown = (e) => this.onmousedown(e);
        this.ELEMENT.ondragstart = () => false;
        this.ELEMENT.onmouseup = () => this.ELEMENT.onmousemove = () => false;
    };

    onmousedown = (e, pane) => {
        pane && Array.from(pane.ELEMENT.children)
            .filter(n => n.classList.contains("selected"))
            .forEach(n => n.classList.replace("selected", "unselected"));
        this.ELEMENT.classList.add("selected");
        this.ELEMENT.onmousemove = this.onmousemove(e, pane);
        e.stopPropagation();
    };

    onmousemove = (e, pane) => {
        if(pane) {
            let paneOffset = pane.ELEMENT.getBoundingClientRect();
            this.ELEMENT.style.left = e.pageX - (this.ELEMENT.offsetWidth >> 1) - paneOffset.x + "px";
            this.ELEMENT.style.top = e.pageY - (this.ELEMENT.offsetHeight >> 1) - paneOffset.y + "px";
            e.stopPropagation();
        }
    };
    getX = () => parseInt(this.ELEMENT.style.left);
    getY = () => parseInt(this.ELEMENT.style.top);
    getCoordinates = () => this.getX() + " " + this.getY();
}
