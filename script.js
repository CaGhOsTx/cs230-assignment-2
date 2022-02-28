const svgPanel = document.getElementsByClassName("svg")[0];
const svg = document.getElementById("svg");
svg.ondragstart = () => false;
this.scale = 1;
svgPanel.onwheel = (e) => {
    e.preventDefault();
    let aux = document.getElementById("aux");
    if(e.deltaY > 0)
        scale += 0.1;
    else if(scale > 0.2)
        scale -= 0.1;
    aux && aux.setAttribute("style", `transform: scale(${scale})`)
    svg.setAttribute("style", `transform: scale(${scale})`)
    svgPanel.setAttribute("style", "background-size: " + 5 * scale + "mm " + 5 * scale + "mm")
    console.log(svgPanel)
    console.log("scale" + scale)
};

svgPanel.onmousedown = (e) => {
    let aux = document.getElementById("aux") || initialiseAuxSVG();
    aux.classList.add("selected");
    let auxW = aux.offsetWidth;
    let auxH = aux.offsetHeight;
    let offsets = svgPanel.getBoundingClientRect();
    aux.onmousemove = (e) => {
        console.log(`mouse:${e.pageX},${e.pageY}|aux:${auxW},${auxH}`)
        auxW = aux.offsetWidth;
        auxH = aux.offsetHeight;
        aux.style.left = e.pageX - (auxW >> 1) - offsets.x + "px";
        aux.style.top = e.pageY - (auxH >> 1) - offsets.y + "px";
        console.log("pos " + aux.style.left + "," + aux.style.top);
    };

}

window.onmouseup = () => {
    aux.onmousemove = () => false;
}

function initialiseAuxSVG() {
    let aux = svg.cloneNode(true);
    aux.ondragstart =  () => false;
    aux.setAttribute("id", "aux");
    svgPanel.appendChild(aux);
    return aux;
}

window.onkeydown = (key) => {
    let aux = document.getElementById("aux");
    if(key.code === "Escape" && aux) {
        svgPanel.removeChild(aux);
    }
}