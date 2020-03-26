class Player {
    constructor(oProps = {}) {
        this.color = oProps.color || "#000";
        this.x = oProps.x || 200;
        this.y = oProps.y || 200;

        this.position = {
            x: parseInt(this.x / TILESIZE, 10),
            y: parseInt(this.y / TILESIZE, 10)
        };

        this.x = this.position.x * TILESIZE;
        this.y = this.position.y * TILESIZE;

        this.speed = SPEED;
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
        if (DEBUG) {
            _oCtx.fillStyle = "green";
            _oCtx.fillRect(this.position.x * TILESIZE, this.position.y * TILESIZE, TILESIZE, TILESIZE);
        }

        this.sprite.draw(this.x - TILESIZE, this.y - TILESIZE * 2, this.controls, 1601 / 20 * SIZE, 2397 / 20 * SIZE, this.speed);

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

        _oCtx.drawImage(this._oSpeechBubble, this.x - 190 * SIZE, this.y - 30 * SIZE, 468 * 0.6 * SIZE, 116 * 0.6 * SIZE);
        _oCtx.font = "12px Courier";
        _oCtx.fillStyle = "black";
        _oCtx.fillText(this.text, this.x - 170 * SIZE, this.y - 0 * SIZE);
    }

    createSpeechBubble() {
        this._oSpeechBubble = new Image();
        this._oSpeechBubble.src = "./WebContent/game/sprites/speech-bubble.png";
    }

    drawInfection() {
        if (!this._infectionSprite) {
            this._infectionSprite = new Sprite({
                w: 720,
                h: 100,
                rows: 1,
                cols: 6,
                fps: 150,
                src: "./WebContent/game/sprites/virus.png"
            });
        }
        this._infectionSprite.draw(this.x + 7, this.y - 20, 50, 36);
    }

    handleMovement() {
        const oPosition = JSON.parse(JSON.stringify(this.position));
        const x = this.x;
        const y = this.y;

        if (this.controls.left) {
            this.x -= this.speed;
        }
        if (this.controls.up) {
            this.y -= this.speed;
        }
        if (this.controls.right) {
            this.x += this.speed;
        }
        if (this.controls.down) {
            this.y += this.speed;
        }

        if (this.controls.left || this.controls.right || this.controls.up || this.controls.down)
            if (this.evaluateMovement(oPosition))
                this.evaluateCollision({x, y, oPosition});
        this.handleBorderReset();
    }

    evaluateCollision(oOldProps) {
        const oCell = _oGame.getCell(this.position.x, this.position.y);
        const bCollision = oCell instanceof Wall;
        if (bCollision) {
            if (oCell.x !== oOldProps.oPosition.x) {
                this.x = oOldProps.x;
                this.position.x = oOldProps.oPosition.x;
            }
            if (oCell.y !== oOldProps.oPosition.y) {
                this.y = oOldProps.y;
                this.position.y = oOldProps.oPosition.y;
            }

        }
    }

    handleBorderReset() {
        if (this.x <= -80) this.x = _oGame.w + 50;
        if (this.x >= _oGame.w + 80) this.x = -50;
        if (this.y <= -80) this.y = _oGame.h + 50;
        if (this.y >= _oGame.h + 80) this.y = -50;
    }

    evaluateMovement(oPosition) {
        this.position.x = parseInt(this.x / TILESIZE, 10);
        this.position.y = parseInt(this.y / TILESIZE, 10);

        return this.position.x !== oPosition.x || this.position.y !== oPosition.y;
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
        this.sprite.setSource("./WebContent/game/sprites/infected.png");
        this.text = "AH I'M INFECTED";
    }

    setHealthy() {
        this.infected = false;
        this.sprite.setSource(this.originSprite);
        this.infectedTimer = 0;
    }

    getRandomSprite() {
        const aSprites = [
            "./WebContent/game/sprites/npc.png",
            "./WebContent/game/sprites/npc2.png",
            "./WebContent/game/sprites/npc3.png",
            "./WebContent/game/sprites/npc4.png",
            "./WebContent/game/sprites/npc5.png"
        ];
        return this.getRandomString(aSprites);
    }

    getRandomString(a) {
        return a[parseInt(Math.random() * a.length - 0.001, 10)];
    }
}