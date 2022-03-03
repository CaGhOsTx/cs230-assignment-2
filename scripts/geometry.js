"use strict"
import { scale } from "./Container.js";
//class that handles the maths behind calculating the distance between the two svgs when doing transformations. 
//Allows visual editing of transformations in a convenient way
export class Arrow {
    constructor(panel) {
        this.ELEMENT = document.createElement("i");
        this.ELEMENT.id = "arrow";
        this.updateArrow(0, 0, 0, 0, panel);
    }

    updateArrow = (x,y,x2,y2, panel) => {
        let offsets = panel.ELEMENT.getBoundingClientRect();
        this.updatePoints(x, y, x2, y2);
        let angle = this.getAngle();
        this.applyStyle(offsets, angle);
        this.updateAnimationMenuFields(document.getElementById("tX"), document.getElementById("tY"));
        this.ELEMENT.innerText = Math.round(this.getDistance() / scale) + "px";
    };
    //simple formula to obtain angle of a vector (I thought half circle periodicty of tan would hurt me but ended up being the thing I needed in the end)
    getAngle() {
        return Math.atan(((this.y2 - this.y) / (this.x2 - this.x)));
    }
    //dynamic css for the object
    applyStyle(offsets, angle) {
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
    }
    //division by scale is to account for the user zooming the panel workspace in and out (relative distance also changes then)
    updateAnimationMenuFields(tx, ty) {
        if (tx)
            tx.value = (this.x2 - this.x) / scale;
        if (ty)
            ty.value = (this.y2 - this.y) / scale;
    }
    //translates the line so that text is oriented properly when the angle is in {PI - 2 PI} range
    mirrorIfLeftOfYAxis() {
        return this.x2 < this.x ? `translate(${(this.x2 - this.x)}px,${(this.y2 - this.y)}px)` : '';
    }

    //updates the state fields of this object
    //the null checking is to allow each object use the same function with parameters at different places
    updatePoints(x, y, x2, y2) {
        this.x = parseInt(x) || this.x;
        this.y = parseInt(y) || this.y;
        this.x2 = parseInt(x2) || this.x2;
        this.y2 = parseInt(y2) || this.y2;
    }

    //pythagoras
    getDistance() {
        return Math.sqrt((this.x2 - this.x) ** 2 + (this.y2 - this.y) ** 2);
    }
}