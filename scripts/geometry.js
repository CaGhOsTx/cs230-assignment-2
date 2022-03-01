"use strict"
import { scale } from "./Container.js";

export class Arrow {
    constructor(panel) {
        this.ELEMENT = document.createElement("i");
        this.ELEMENT.id = "arrow";
        this.updateArrow(0, 0, 0, 0, panel);
    }

    updateArrow = (x,y,x2,y2, panel) => {
        let tx = document.getElementById("tX");
        let ty = document.getElementById("tY");
        let offsets = panel.ELEMENT.getBoundingClientRect();
        this.updatePoints(x, y, x2, y2);
        let angle = Math.atan(((this.y2 - this.y)/(this.x2 - this.x)));
        this.ELEMENT.setAttribute("style", 
            `
            left: ${this.x - offsets.x}px;
            top: ${this.y - offsets.y}px;
            width:${this.getDistance()}px;
            border-top:${scale * 5}px dashed cyan;
            transform:
                ${this.mirrorIfLeftOfYAxis()}
                rotate(${angle}rad)
            `
        );
        if(tx) tx.value = this.x2 - this.x;
        if(ty) ty.value = this.y2 - this.y;
        this.ELEMENT.innerText = Math.round(this.getDistance()) + "px";
    };

    mirrorIfLeftOfYAxis() {
        return this.x2 < this.x ? `translate(${(this.x2 - this.x)}px,${(this.y2 - this.y)}px)` : '';
    }

    updatePoints(x, y, x2, y2) {
        this.x = parseInt(x) || this.x;
        this.y = parseInt(y) || this.y;
        this.x2 = parseInt(x2) || this.x2;
        this.y2 = parseInt(y2) || this.y2;
    }

    printArrow () {
        console.log(this.x + " " + this.y + " " + this.x2 + " " + this.y2)
    }

    getDistance() {
        return Math.sqrt((this.x2 - this.x) ** 2 + (this.y2 - this.y) ** 2);
    }
}