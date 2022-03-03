import { removeHelperTools } from "./Main.js";

export default class AnimationUIController {
    constructor(buttons, uiOptions, target, trigger) {
        this.currentAnimation = undefined;
        this.uiOptions = uiOptions;
        this.target = target;
        this.buttons = buttons;
        buttons.forEach(b => b.onmousedown = (e) => this.inject(b));
        trigger.onclick = (e) => {
            this.applyAnimation(uiOptions.fromString(this.currentAnimation));
        }
    }

    inject(b) {
        removeHelperTools();
        if (b.id != this.currentAnimation)
            this.target.innerHTML = `<h1>${b.id}</h1>` + this.uiOptions.fromString(this.currentAnimation = b.id).html;
        if(this.currentAnimation === "color")
            this.changeBackgroundOfColorContainer()

    }

    changeBackgroundOfColorContainer() {
        Array.from(document.getElementsByClassName("colorInput")).forEach(m => {
            let colorPicker = m.children[0]
            colorPicker.onchange = () => {
                m.style.background = colorPicker.value;
                console.log(m.style.background);
            }
        })
    }

    applyAnimation(animationType) {
        document.getElementById("ghostCSS").innerHTML = `#ghost{
            fill: white;
            ${animationType.css ? animationType.css() : ""}
            animation: anim linear ${document.getElementById("dur").value}s alternate infinite;
            }
            @keyframes anim {
                ${animationType.animation()}
            }
        `;
    }
}

