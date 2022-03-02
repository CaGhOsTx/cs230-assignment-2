//Before I figured out enums exist in javascript....

class Menu {
    constructor(name, html) {
        this.html = html;
        this.name = name;
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
    `);
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
    `);
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
`);
export const colorM = new Menu('colorM',
    `
    <div class="sep">
        <label for="cFrom" value="red">starting color</label>
        <input type="color" id="cFrom"/>
    </div>
    <div class="sep">
        <label for="cTo" value="cyan">final color</label>
        <input type="color" id="cTo"/>
    </div>
    <div class="sep">
        <label for="dur">duration</label>
        <input type="number" id="dur"/>
        <span class="tUnit">s</span>
    </div>
    `);
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
    `);
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
`);
const values = [translateM, rotateM, skewM, colorM, strokeM, scaleM]

export const fromID = (id) => values.filter(menu => menu.name.includes(id))[0].html;