class Game {
    constructor(viewW, viewH, w, h, map) {
        this.nextId = 0;
        this.w = w;
        this.h = h;
        this._aPlayers = [];
        this._oRoom = new Room(this.w, this.h, map);
        this._bRunning = false;

        this.viewW = viewW;
        this.viewH = viewH;
        this.camera = new Camera(0, 0, this.viewW, this.viewH, w, h);
    }

    getCell(x, y) {
        return this._oRoom.getCell(x, y);
    }

    start() {
        if (!this._bRunning) {
            this._bRunning = true;
            this._iInterval = setInterval(() => {
                try {
                    this.gameLoop();
                } catch (e) {
                    this.stop();
                    console.warn("Game stopped due to error");
                    console.error(e);
                }
            }, 20);
            console.log("Game started");
        }
    }

    stop() {
        if (this._bRunning) {
            this._bRunning = false;
            clearInterval(this._iInterval);
            console.log("Game stopped");
        }
    }

    toggle() {
        this._bRunning ? this.stop() : this.start();
    }

    gameLoop() {
        this._aPlayers.forEach(e => e.update());
        this.camera.update();
        this.draw(this.camera.xView, this.camera.yView);
        this.corona();
    }

    addPlayer(oPlayer) {
        this._aPlayers.push(oPlayer);
        oPlayer.id = this.getNextId();
        this.camera.follow(oPlayer, this.viewW / 2, this.viewH / 2);
    }

    addNPCs(i) {
        for (let j = 0; j < i; j++) {
            this.addNPC();
        }
    }

    addNPC() {
        const oNPC = new NPC(this.w, this.h);
        oNPC.id = this.getNextId();
        this._aPlayers.push(oNPC);
    }

    draw(xView, yView) {
        this._oRoom.draw(xView, yView);
        this._aPlayers.forEach(e => e.draw(xView, yView));
    }

    corona() {
        this._aPlayers.forEach((e, i, a) => {
            if (e.infected) {
                a.forEach(other => {
                    if (this.isNear(e, other)) {
                        if (!other.infected) {
                            other.setInfected();
                        }
                    }
                })
            }
        });
    }

    isNear(playerA, playerB) {
        if (playerA.id === playerB.id) {
            return false;
        }
        const bXnear = playerA.x - 40 <= playerB.x && playerA.x + 40 >= playerB.x;
        const bYnear = playerA.y - 40 <= playerB.y && playerA.y + 40 >= playerB.y;
        return bXnear && bYnear;
    }

    getNextId() {
        this.nextId++;
        return this.nextId;
    }

    getValidCells() {
        if (!this.validCells) {
            let aValidCells = [];
            _oGame._oRoom.grid.forEach(row => {
                const a = row.filter(e => {
                    return !(e instanceof Wall) && e.y < 18;
                });
                aValidCells = aValidCells.concat(a);
            });
            this.validCells = aValidCells;
        }
        return this.validCells;
    }
}