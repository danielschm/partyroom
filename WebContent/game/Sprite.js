class Sprite {
    constructor(props) {
        this.spriteWidth = props.w;
        this.spriteHeight = props.h;

        this.rows = props.rows;
        this.cols = props.cols;

        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;

        this.curFrame = 0;
        this.frameCount = props.cols;
        this.frameLength = props.fps ? 1000 / props.fps : 1000 / 30;

        this._counter = 0;

        this.srcX = 0;
        this.srcY = 0;

        this.image = new Image();
        this.image.src = props.src;
        this.spriteSrc = props.src;
    }

    update() {
        if (this._counter >= this.frameLength) {
            this._counter = 0;
        }

        this._counter++;
        if (this._counter >= this.frameLength) {
            this.curFrame = ++this.curFrame % this.frameCount;
        }

        this.srcX = this.curFrame * this.width;
    }

    draw(x, y, w, h) {
        this.update();
        _oCtx.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, x, y, w || this.width, h || this.height);
    }

    setSource(src) {
        this.image.src = src;
        this.spriteSrc = src;
    }

    getSource() {
        return this.spriteSrc;
    }
}