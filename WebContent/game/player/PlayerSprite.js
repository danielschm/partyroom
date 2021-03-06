class PlayerSprite extends Sprite {
    constructor(props) {
        props.rows = 4;
        props.cols = 4;
        super(props);
        this.trackRight = 3;
        this.trackLeft = 2;
        this.trackUp = 1;
        this.trackDown = 0;

        this.curFrame = 0;
        this.curTrack = 3;
        this.frameCount = 4;
    }

    update(movement, speed) {
        this.frameLength = parseInt(6 / Math.log(speed / 2 + 2), 10);
        if (speed < 0.01) {
            this.frameLength *= 10000;
            this.curFrame = 3;
        }

        if (this._counter === this.frameLength) {
            this._counter = 0;
        }

        if (movement.left) {
            this.curTrack = this.trackLeft;
        } else if (movement.right) {
            this.curTrack = this.trackRight;
        } else if (movement.up) {
            this.curTrack = this.trackUp;
        } else if (movement.down) {
            this.curTrack = this.trackDown;
        } else {
            this.srcX = 3 * this.width;
            this._counter = 0;
            this.curFrame = 0;
            return;
        }

        this._counter++;
        if (this._counter === this.frameLength) {
            this.curFrame = ++this.curFrame % this.frameCount;
        }

        this.srcX = this.curFrame * this.width;
        this.srcY = this.curTrack * this.height;
    }

    draw(x, y, movement, w, h, speed) {
        this.update(movement, speed);
        _oCtx.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, x, y, w || this.width, h || this.height);
    }
}