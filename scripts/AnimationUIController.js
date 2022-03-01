export default class AnimationUIController {
    constructor(buttons, uiOptions, target) {
        this.currentAnimation = undefined;
        console.log(uiOptions)
        this.uiOptions = uiOptions;
        this.target = target;
        this.buttons = buttons;
        buttons.forEach(b => b.onmousedown = (e) => this.inject(b));
    }

    inject(b) {
        if (b.id != this.currentAnimation)
            this.target.innerHTML = `<h1>${b.id}</h1>` + this.uiOptions.fromID(this.currentAnimation = b.id);
    }
}