class Sprite {
    constructor(w, h, sprite) {
        //the with and height of our spritesheet
        this.spriteWidth = w;
        this.spriteHeight = h;

        //we are having two rows and 8 cols in the current sprite sheet
        this.rows = 4;
        this.cols = 4;

        this.trackRight = 3;
        this.trackLeft = 2;
        this.trackUp = 1;
        this.trackDown = 0;

        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;

        this.curFrame = 0;
        this.curTrack = 3;
        this.frameCount = 4;


        this._counter = 0;

        this.srcX = 0;
        this.srcY = 0;

        this.image = new Image();
        this.image.src = sprite;
        this.spriteSrc = sprite;
    }

    update(movement, speed) {
        this.frameLength = parseInt( 6 / Math.log(speed+1.5), 10);
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

    setSource(src) {
        this.image.src = src;
        this.spriteSrc = src;
    }

    getSource() {
        return this.spriteSrc;
    }
}