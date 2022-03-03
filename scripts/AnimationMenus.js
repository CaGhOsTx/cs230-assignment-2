//Some form of a builder ? D:

class Menu {
    constructor(name, html) {
        this.html = html;
        this.name = name;
    }

    withUnclosedCSSStyle (css) {
        this.css = css;
        return this;
    }
    withAnimation (animation) {
        this.animation = animation;
        return this;
    }
}

export const translateM = new Menu( 'translateM', 
    `
    <div class="sep">
        <label for="tX">X</label>
        <input type="number" id="tX"/>
        <span class="unit">px</span>
    </div>
    <div class="sep">
        <label for="tY">Y</label>
        <input type="number" id="tY"/>
        <span class="unit">px</span>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
    `).withAnimation(() => `from {transform: translate(0,0);}to {transform: translate(${document.getElementById("tX").value}px, ${document.getElementById("tY").value}px);}`);
export const rotateM = new Menu('rotateM',
    `
    <div class="sep">
        <label for="rot">angle</label>
        <input type="number" id="rot"/>
        <span class="unit">deg</span>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
    `).withAnimation(() => `from {transform: rotate(0);}to {transform: rotate(${document.getElementById("rot").value}deg); }`);
export const skewM = new Menu('skewM', 
    `
    <div class="sep">
        <label for="sX">angleX</label>
        <input type="number" id="sX"/>
        <span class="unit">deg</span>
    </div>
    <div class="sep">
        <label for="sY">angleY</label>
        <input type="number" id="sY"/>
        <span class="unit">deg</span>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
    `).withAnimation(() => `from {transform: skew(0,0);}to { transform: skew(${document.getElementById("sX").value}deg, ${document.getElementById("sY").value}deg);}`);
export const colorM = new Menu('colorM',
    `
    <div class="sep">
        <label for="cFrom">starting color</label>
        <span class="colorInput" style="background: #43aa8b">
            <input type="color" value="#43aa8b" id="cFrom"/>
        </span>
    </div>
    <div class="sep">
        <label for="cTo" >final color</label>
        <span class="colorInput" style="background: #43aa8b">
            <input type="color" value="#43aa8b" id="cTo"/>
        </span>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
    `
).withAnimation(() => `from {fill: ${document.getElementById("cFrom").value}}to {fill: ${document.getElementById("cTo").value}}`);
export const strokeM = new Menu('strokeM',
    `
    <div class="sep">
        <label for="sWidth">stroke width</label>
        <input type="number" id="sWidth"/>
        <span class="unit">px</span>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
    `
).withUnclosedCSSStyle(() =>
    `
        stroke: white;
        stroke-width: ${document.getElementById("sWidth").value};
        stroke-dasharray: 6500;
        stroke-dashoffset: 5;
        fill:none;
    `
).withAnimation(() => `from {stroke-dashoffset: 6500;}to {stroke-dashoffset: 0;}`)
export const scaleM = new Menu('scaleM',
`
    <div class="sep">
        <label for="sX">scale X</label>
        <input type="number" id="sX"/>
    </div>
    <div class="sep">
        <label for="sY">scale Y</label>
        <input type="number" id="sY"/>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
`).withAnimation(() => `from {transform: scale(1,1);}to { transform: scale(${document.getElementById('sX').value}, ${document.getElementById('sY').value});}`);

const values = [translateM, rotateM, skewM, colorM, strokeM, scaleM]

export const fromString = (id) => values.filter(menu => menu.name.includes(id))[0];