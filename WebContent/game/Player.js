SIZE = 0.8;

class Player {
    constructor(oProps = {}) {
        this.color = oProps.color || "#000";
        this.x = oProps.x || 200;
        this.y = oProps.y || 200;
        this.speed = 2;
        this.controls = {
            left: false,
            up: false,
            right: false,
            down: false
        };
        this.text = undefined;
    }

    draw() {
        this.sprite.draw(this.x, this.y, this.controls, 1601 / 20 * SIZE, 2397 / 20 * SIZE, this.speed);
        if (this.text) {
            this.drawText();
        }
    }

    drawText() {
        if (!this._oSpeechBubble) {
            this.createSpeechBubble();
        }

        _oCtx.drawImage(this._oSpeechBubble, this.x-190*SIZE, this.y-30*SIZE, 468 * 0.6 * SIZE, 116 * 0.6 * SIZE);
        _oCtx.font = "20px Courier";
        _oCtx.fillStyle = "black";
        _oCtx.fillText(this.text, this.x-170*SIZE, this.y-0*SIZE);
    }

    createSpeechBubble() {
        this._oSpeechBubble = new Image();
        this._oSpeechBubble.src = "./game/sprites/speech-bubble.png";
    }

    update() {
        if (this.controls.left)
            this.x -= this.speed * STEP * 80;
        if (this.controls.up)
            this.y -= this.speed * STEP * 80;
        if (this.controls.right)
            this.x += this.speed * STEP * 80;
        if (this.controls.down)
            this.y += this.speed * STEP * 80;

        if (this.x <= -80) this.x = _oGame.w + 50;
        if (this.x >= _oGame.w + 80) this.x = -50;
        if (this.y <= -80) this.y = _oGame.h + 50;
        if (this.y >= _oGame.h + 80) this.y = -50;
    }
}