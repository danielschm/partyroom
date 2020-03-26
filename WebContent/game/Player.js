SIZE = 0.8;
INFECTEDTIME = 800;
TEXTTIME = 50;

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
        this.infected = false;

        this.textTimer = 0;

        this.infectedTimer = 0;

        const sprite = oProps.sprite || this.getRandomSprite();
        this.sprite = new PlayerSprite({
            w: 1601,
            h: 2397,
            src: sprite,
            speed: this.speed
        });
        this.originSprite = sprite;
    }

    update() {
        this.handleMovement()
        this.handleInfection();
        this.handleText();
    }

    draw() {
        this.sprite.draw(this.x, this.y, this.controls, 1601 / 20 * SIZE, 2397 / 20 * SIZE, this.speed);
        if (this.text) {
            this.drawText();
        }
        if (this.infected) {
            this.drawInfection();
        }
    }

    drawText() {
        if (!this._oSpeechBubble) {
            this.createSpeechBubble();
        }

        _oCtx.drawImage(this._oSpeechBubble, this.x-190*SIZE, this.y-30*SIZE, 468 * 0.6 * SIZE, 116 * 0.6 * SIZE);
        _oCtx.font = "12px Courier";
        _oCtx.fillStyle = "black";
        _oCtx.fillText(this.text, this.x-170*SIZE, this.y-0*SIZE);
    }

    createSpeechBubble() {
        this._oSpeechBubble = new Image();
        this._oSpeechBubble.src = "./game/sprites/speech-bubble.png";
    }

    drawInfection() {
        if (!this._infectionSprite) {
            this._infectionSprite = new Sprite({
                w: 720,
                h: 100,
                rows: 1,
                cols: 6,
                fps: 150,
                src: "./game/sprites/virus.png"
            });
        }
        this._infectionSprite.draw(this.x+7, this.y-20, 50,36);
    }

    handleMovement() {
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

    handleInfection() {
        if (this.infected) {
            this.infectedTimer++;
            if (this.infectedTimer >= INFECTEDTIME) {
                this.setHealthy();
            }
        }
    }

    handleText() {
        if (this.text) {
            this.textTimer++;
            if (this.textTimer >= TEXTTIME) {
                this.textTimer = 0;
                this.text = undefined;
            }
        }
    }

    setInfected() {
        this.infected = true;
        this.sprite.setSource("./game/sprites/infected.png");
        this.text = "AH I'M INFECTED";
    }

    setHealthy() {
        this.infected = false;
        this.sprite.setSource(this.originSprite);
        this.infectedTimer = 0;
    }

    getRandomSprite() {
        const aSprites = [
            "./game/sprites/npc.png",
            "./game/sprites/npc2.png",
            "./game/sprites/npc3.png",
            "./game/sprites/npc4.png",
            "./game/sprites/npc5.png"
        ];
        return this.getRandomString(aSprites);
    }

    getRandomString(a) {
        return a[parseInt(Math.random() * a.length - 0.001, 10)];
    }
}