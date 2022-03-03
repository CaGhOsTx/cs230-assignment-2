"use strict";
//this whole concept needs to be refactored and done in a nicer way :/
//wrapper for the svg element with the preset dragging and clicking functionality (as all svg elements should behave similarly if not the same) 
export default class SVGElement {
    constructor(ELEMENT) {
        //Yes I know that it is silly and confusing
        //to provide a supplier for the DOM element in here.. 
        //I had to do it to avoid cyclic dependency issues :(
        this.ELEMENT = ELEMENT();
        this.ELEMENT.onmousedown = (e) => this.onmousedown(e);
        //disable native ondragstart functionality
        this.ELEMENT.ondragstart = () => false;
        //stop dragging when mouse lifts
        this.ELEMENT.onmouseup = () => this.ELEMENT.onmousemove = () => false;
    };

    onmousedown = (e, pane) => {
        //if pane exists toggle selected for the current element
        pane && Array.from(pane.ELEMENT.children)
            .filter(n => n.classList.contains("selected"))
            .forEach(n => n.classList.replace("selected", "unselected"));
        this.ELEMENT.classList.add("selected");
        this.ELEMENT.onmousemove = this.onmousemove(e, pane);
        //stop the event from triggering listeners below
        e.stopPropagation();
    };

    onmousemove = (e, pane) => {
        //update the coordinates of this element based on the mouse position and general offset
        //bitwise division by two there is to make the point of reference the center of the element.
        if(pane) {
            let paneOffset = pane.ELEMENT.getBoundingClientRect();
            this.ELEMENT.style.left = e.pageX - (this.ELEMENT.offsetWidth >> 1) - paneOffset.x + "px";
            this.ELEMENT.style.top = e.pageY - (this.ELEMENT.offsetHeight >> 1) - paneOffset.y + "px";
            //stop the event from triggering listeners below
            e.stopPropagation();
        }
    };
}
