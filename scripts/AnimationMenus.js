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
        <input type="text" id="tX"></input>
    </div>
    <div class="sep">
        <label for="tY">Y</label>
        <input type="text" id="tY"></input>
    </div>
    `);
export const rotateM = new Menu('rotateM',
    `
    <div class="sep">
        <label for="rot">&angle;&#8728;</label>
        <input type="text" id="rot"></input>
    </div>
    `);
export const skewM = new Menu('skewM', 
`
    <div class="sep">
        <label for="sFrom">&angle;&#8728;X</label>
        <input type="text" id="sFrom"></input>
    </div>
    <div class="sep">
        <label for="sTo">&angle;&#8728;Y</label>
        <input type="text" id="sTo"></input>
    </div>
`);
export const colorM = new Menu('colorM',
    `
    <div class="sep">
        <label for="cFrom">starting color</label>
        <input type="color" id="cFrom"></input>
    </div>
    <div class="sep">
        <label for="cTo">final color</label>
        <input type="color" id="cTo"></input>
    </div>
    `);
export const strokeM = new Menu('strokeM',
    `
    <div class="sep">
        <label for="sWidth">stroke width</label>
        <input type="text" id="sWidth"></input>
    </div>
    `);
export const scaleM = new Menu('scaleM',
`
    <div class="sep">
        <label for="sFrom">scale from</label>
        <input type="text" id="sFrom"></input>
    </div>
    <div class="sep">
        <label for="sTo">scale to</label>
        <input type="text" id="sTo"></input>
    </div>
`);
const values = [translateM, rotateM, skewM, colorM, strokeM, scaleM]

export const fromID = (id) => values.filter(menu => menu.name.includes(id))[0].html;